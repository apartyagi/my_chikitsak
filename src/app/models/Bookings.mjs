import mongoose from "mongoose";
import moment from "moment";
const bookingSchema=mongoose.Schema({
   
    bookingType:String,
     
    createdAt:{
        type:Date,
        default:moment().format("YYYY-MM-DDTHH:mm:ss")
    }
})

const bookingModel=mongoose.model('Booking',bookingSchema);

export default bookingModel;