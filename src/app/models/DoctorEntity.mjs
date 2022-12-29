import mongoose from "mongoose";

const timeSlots=mongoose.Schema({
    
})

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
    email:String,
    address:String,
    mciNo:String,
    aadharNo:String,
    experience:String,
    speciality:String,
    serviceType:{
        type:String,
        enum:['online','offline','both']
    },
    servieDays:{
        type:String,
        enum:['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
    },
    serviceTimes:[
        
    ],
    createddate:String,
    status:Boolean,
    verified:Boolean,
    reverified:Boolean,
    profileCompleted:Boolean,
})

const doctorModel=mongoose.model('Doctor',doctorSchema);

export default doctorModel;