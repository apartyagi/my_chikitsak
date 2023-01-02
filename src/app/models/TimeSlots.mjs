import mongoose from "mongoose";
import moment from "moment";
const timeSchema=mongoose.Schema({
    start_time:String,
    end_time:String,
    name:String,
    type:String,
    og:Number,
    createdAt:{
        type:Date,
        default:moment().format('YYYY-MM-DD HH:mm')
    },
})

const timeModel=mongoose.model('TimeSlots',timeSchema);

export default timeModel;