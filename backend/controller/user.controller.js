const { User } = require('../models/user.model.js');
const Account = require('../models/account.model.js');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const z = require('zod');

// Validation Schemas
const registerSchema = z.object({
    firstName: z.string().min(3, "First name must be at least 3 characters long!"),
    lastName: z.string().min(3, "Last name must be at least 3 characters long!"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
    phoneNo : z.string().length(10)
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
});

const updateUserSchema = z.object({
    firstName: z.string().min(3, "First name must be at least 3 characters").optional(),
    lastName: z.string().min(3, "Last name must be at least 3 characters").optional(),
    phoneNo : z.string().length(10).optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().min(6, "New password must be at least 6 characters").optional(),
});

// Controllers

// Register
const register = async (req, res) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                msg: "Validation failed",
                errors: result.error.errors,
            });
        }

        const { firstName, lastName, email, password , phoneNo } = result.data;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ msg: "Try a different email ID", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ firstName, lastName, email, password: hashedPassword , phoneNo });

        return res.status(201).json({ msg: "User registered successfully", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                msg: "Validation failed",
                errors: result.error.errors,
            });
        }

        const { email, password } = result.data;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Incorrect email ID", success: false });
        }

        const isPassMatched = await bcrypt.compare(password, user.password);
        if (!isPassMatched) {
            return res.status(401).json({ msg: "Incorrect password", success: false });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        // Check if an account already exists for this user
        let account = await Account.findOne({ userId: user._id });
        if (!account) {
            const max = 10000;
            const randomAmount = Math.floor(Math.random() * max);
            account = await Account.create({
                userId: user._id,
                balance: randomAmount
            });
        }

        return res.json({
            message: `Welcome ${user.firstName}`,
            success: true,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

// Update User Info
const updateUserInfo = async (req, res) => {
    console.log("Update User Info route hit");
    console.log("User ID from token:", req.id);
    try {
        const result = updateUserSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                msg: "Validation failed",
                errors: result.error.errors,
            });
        }

        const user = await User.findById(req.id).select("-password"); // Ensure it's req.user.id
        if (!user) {
            return res.status(404).json({ msg: "User not found", success: false });
        }

        const { firstName, lastName, phoneNo, password } = result.data;

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (phoneNo) user.phoneNo = phoneNo;
        if (password) user.password = password;

        await user.save();
        return res.json({
            msg: "User updated successfully",
            success: true,
            user: { firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNo: user.phoneNo },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};



//filter user's friend and searching route
const filterUser = async (req, res) => {
    try {
        const searchQuery = req.query.filter;

        if (!searchQuery) {
            return res.status(400).json({
                msg: "Query is required"
            });
        }

        // Fixed regex options syntax
        const result = await User.find({
            $or: [
                { firstName: { $regex: searchQuery, $options: "i" } },
                { lastName: { $regex: searchQuery, $options: "i" } },
                { email: { $regex: searchQuery, $options: "i" } },
                { phoneNo: { $regex: searchQuery, $options: "i" } }
            ]
        }).select("firstName lastName email phoneNo");

        return res.status(200).json({
            success: true,
            users: result.map(user => ({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNo: user.phoneNo
            }))
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
};

const allUser = async (req,res)=>{
    try {
        const currentUserId = req.id; // Logged-in user's ID

        // Fetch all users excluding password
        const fetchAllUsers = await User.find()
            .select("firstName lastName email phoneNo");

        // Filter out the current user
        const filteredUsers = fetchAllUsers.filter(user => user._id.toString() !== currentUserId);

        return res.status(200).json({
            success: true,
            users: filteredUsers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ success: false, msg: "User ID is required" });
        }

        const user = await User.findById(userId).select("firstName lastName email phoneNo");

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};


module.exports = {
    register,
    login,
    updateUserInfo,
    filterUser,
    allUser,
    getUserById
}