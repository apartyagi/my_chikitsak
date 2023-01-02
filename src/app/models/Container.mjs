import mongoose from "mongoose";
import moment from "moment";
const containerSchema=mongoose.Schema({
   
    UID:Number,
    body:String,
    type:String,
    whom:String,
    createdAt:{
        type:Date,
        default:moment().format("YYYY-MM-DDTHH:mm:ss")
    }
})

const containerModel=mongoose.model('Container',containerSchema);

export default containerModel;