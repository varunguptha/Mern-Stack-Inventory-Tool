const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const errorHandler = require("./errorMiddleware");
const { use } = require("../routes/userRoute");

const protect = asyncHandler(async (req, res, next) =>
{
    try
    {
        const token = req.cookies.token

        if (!token)
        {
            res.status(401)
            throw new Error("Not Authorized, Please login")
        }

        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(verified.id).select("-password")

        if (!user)
        {
            res.status(401)
            throw new Error("User not found")
        }
        req.user = user
        next()
    }
    catch (error)
    {
        res.status(401)
        throw new Error("Not Authorized, Please login")

    }
});
module.exports = protect