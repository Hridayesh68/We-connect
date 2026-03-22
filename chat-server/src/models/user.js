import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required: true,
            unique: true,
        },
        fullName:{
            type:String,
            required: true,
            
        },
        password:{
            type:String,
            required: false,
        },
        profilePic:{
            type:String,
            default: "",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationOTP: String,
        verificationOTPExpires: Date,
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {timestamps: true}
);
const User=mongoose.model("User",userSchema);
export default User;