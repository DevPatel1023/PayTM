const  express = require("express") ;
const { register, login, updateUserInfo,filterUser, allUser,getUserById } = require("../controller/user.controller.js") ;
const authenticationToken = require('../middleware/auth.middleware.js') ;
const router = express.Router();

// User routes
router.post("/register", register);
router.post("/login", login);
router.put("/updateUserInfo",authenticationToken, updateUserInfo);
router.get("/search",authenticationToken, filterUser);
router.get("/all",authenticationToken,allUser);
router.get("/:id", authenticationToken, getUserById);

module.exports = router;
