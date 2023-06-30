const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a Name"]
    },
    email: {
        type: String,
        required: [true, "Please add a Email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid Email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a Password"],
        minLength: [6, "Password Must be greater than 6 Characters"],
        // maxLength: [23, "Password Must be less than 23 Characters"],

    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://res.cloudinary.com/dnqowci9v/image/upload/v1686889790/DefaultImage_mt0qxi.jpg"
    },
    phone: {
        type: String,
        default: "+91"
    },
    bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio"
    }

}, {
    timstamps: true,
}

)
//Password Encryption
userSchema.pre("save", async function (next)
{
    if (!this.isModified("password"))
    {
        return next();
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

const User = mongoose.model("User", userSchema)
module.exports = User