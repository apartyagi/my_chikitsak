import mongoose from "mongoose";
import moment from "moment";
const userSchema=mongoose.Schema({
    phone:{
        unique: true,
        type:String,
    },
    password:String,
    otp:String,
    lat:String,
    lng:String,
    deviceToken:String,
    name:String,
    email:String,
    gender:String,
    image:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
    },
    dob:String,
    address:String,
    type:String,
    createdAt:{
        type:Date,
        default:moment().format('YYYY-MM-DD HH:mm')
    },
    status:Boolean,
    verified:Boolean,
})

const userModel=mongoose.model('User',userSchema);

export default userModel;