import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // profilePic: {
    //     type: String,
    //     default: "",
    // },
    // profilePicPublicId: {
    //     type: String,
    //     default: "",
    // },
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["homeGrower","farmer","admin","enthusiast"],
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    city: {
        type: String,
    },
    zipcode: {
        type: String,
    }
},{
    timestamps: true
})

export const User = mongoose.model("User",userSchema);