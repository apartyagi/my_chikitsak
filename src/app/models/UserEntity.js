import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    phone:{
        unique: true,
        type:String,
    },
    otp:{
        type:String,
    },
    isAlreadySignUp:{
      type:Boolean,  
    },
    lat:String,
    lng:String,
    deviceToken:String,
    name:String,
    dob:String,
    createddate:String,
    status:Boolean,
})

const userModel=mongoose.model('User',userSchema);

export default userModel;