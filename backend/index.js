const express = require("express");
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./DB/connect.js'); 
const mainRouter = require( "./routes/main.router.js");
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));
app.use(cookieParser());
app.use("/api/v1/",mainRouter);


app.listen(process.env.PORT, async () => {
    console.log(`Server is running on ${process.env.PORT}`);
    await connectDB();
});
