import mongoose from "mongoose";
import moment from "moment";
const patientSchema=mongoose.Schema({
    
    ptName:String,
    ptAge:String,
    ptGender:String,
    userId:mongoose.Types.ObjectId,
    descriptions:String,
    reports:[String],
    createdAt:{
        type:Date,
        default:moment().format('YYYY-MM-DD HH:mm')
    },
})

const patientModel=mongoose.model('Patient',patientSchema);

export default patientModel;