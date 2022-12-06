import mongoose from "mongoose";

const doctorSchema=mongoose.Schema({
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
    name:String,
    dob:String,
    createddate:String,
    status:Boolean,
})

const doctorModel=mongoose.model('Doctor',doctorSchema);

export default doctorModel;