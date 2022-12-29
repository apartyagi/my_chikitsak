import mongoose from "mongoose";
import moment from "moment";

const onlineCategorySchema=mongoose.Schema({
    name:{
        require:true,
        type:String
    },
    logo:{
        require:true,
        type:String
    },
    bgColor:String,
    subcategory:{
        type:[{name:String,logo:String,bgColor:String}]
    },
    createdAt:{
        type:Date,
        default:moment().format("YYYY-MM-DDTHH:mm:ss")
    }
});


const onlineCategoryModel=mongoose.model('OnlineCategory', onlineCategorySchema);


export default onlineCategoryModel;