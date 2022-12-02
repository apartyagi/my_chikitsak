import mongoose from "mongoose";
import moment from "moment";
const categorySchema=mongoose.Schema({
   
    name:{
        require:true,
        type:String
    },
    logo:{
        require:true,
        type:String
    },
    subcategory:{
        type:[{name:String,logo:String}]
    },
    createdAt:{
        type:Date,
        default:moment().format("YYYY-MM-DDTHH:mm:ss")
    }
})

const categoryModel=mongoose.model('Category',categorySchema);

export default categoryModel;