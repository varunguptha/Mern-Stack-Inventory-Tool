const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const generateToken = (id) =>
{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
};

// Register User
const registerUser = asyncHandler(async (req, res) =>
{
    const { name, email, password } = req.body

    if (!name || !email || !password)
    {
        res.status(400)
        throw new Error("Please fill all the required Fields")
    }
    if (password.length < 6)
    {
        res.status(400)
        throw new Error("Password Must be more than 6 characters")
    }
    if (password.length > 23)
    {
        res.status(400)
        throw new Error("Password Must be less than 23 characters")
    }

    const userExists = await User.findOne({ email })

    if (userExists)
    {
        res.status(400)
        throw new Error("Email Already Exists.")
    }



    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    //Token Generation
    const token = generateToken(user._id);

    // Send Http - only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    });

    if (user)
    {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        });
    } else
    {
        res.status(400)
        throw new Error("Invalid User Details")
    }

});

//Login User
const loginUser = asyncHandler(async (req, res) =>
{
    const { email, password } = req.body

    // validate request
    if (!email || !password)
    {
        res.status(400)
        throw new Error("Please Add Emial and Password")
    }

    // check if user exist in database
    const user = await User.findOne({ email })
    if (!user)
    {
        res.status(400)
        throw new Error("User not found please signup")
    }

    // User exist now check if passeord is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //Token Generation
    const token = generateToken(user._id);

    // Send Http - only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    });


    if (user && passwordIsCorrect)
    {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        });
    }
    else
    {
        res.status(400)
        throw new Error("Invalid email or password")
    }

});
// Logout user

const logout = asyncHandler(async (req, res) =>
{
    // Send Http - only cookie
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
    });
    return res.status(200).json({
        message: "Successfully Logged Out"
    })
});

//Get User Data
const getuser = asyncHandler(async (req, res) =>
{
    const user = await User.findById(req.user._id)
    if (user)
    {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id, name, email, photo, phone, bio
        });
    }
    else
    {
        res.status(400)
        throw new Error("User Not Found")
    }
});

const loginStatus = asyncHandler(async (req, res) =>
{
    const token = req.cookies.token;
    if (!token)
    {
        return res.json(false)
    }
    //Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified)
    {
        return res.json(true)
    }
    return res.json(false)
});

//update user

const updateuser = asyncHandler(async (req, res) =>
{

    const user = await User.findById(req.user._id)

    if (user)
    {
        const { name, email, photo, phone, bio } = user;

        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;


        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            phone: updatedUser.phone,
            bio: updatedUser.bio
        });
    }
    else
    {
        res.status(404)
        throw new Error("User not found")
    }

});

const changepassword = asyncHandler(async (req, res) =>
{

    const user = await User.findById(req.user._id)

    const { oldPassword, password } = req.body
    //validation
    if (!user)
    {
        res.status(400);
        throw new Error("User not found, please signup");
    }
    if (!oldPassword || !password)
    {
        res.status(400);
        throw new Error("Please add Old and new password");
    }

    // Check if Password is correct
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    //Save new password
    if (user && passwordIsCorrect)
    {
        user.password = password
        await user.save()
        res.status(200).send("Password Changed Successfully")
    }
    else
    {
        res.status(400);
        throw new Error("Old password is incorrect");
    }


})

const forgotPassword = asyncHandler(async (req, res) =>
{
    res.send("Forgot Password")
})

module.exports = {
    registerUser, loginUser, logout, getuser, loginStatus, updateuser, changepassword, forgotPassword
}