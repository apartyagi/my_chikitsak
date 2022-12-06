import userModel from "../models/UserEntity.mjs";
import categoryModel from "../models/CategoriesEntity.mjs";
import mongoose from "mongoose";
import review from "../temp/temp.mjs";
import doctorModel from "../models/DoctorEntity.mjs";

class UserService{

async loginUser(phone,type){
    const data=await userModel.findOne({});
    return true;
}


async verifyOTP(phone,Otp,type){
    if(true===true){
        return true;
    }else{
        return false;
    }
}

async home(){
    const activeDoctor=4;
    return {
        activeDoctor:4,
        review:review
    }
}

async save_userDetails_latLngDevice(lat,lng,token,id){
    const pp={
        lat:lat,
        lng:lng,
        deviceToken:token
    }
    const data=await userModel.findOneAndUpdate({_id:id},{$set:pp});
    return true
}

async get_all_category(){
    const list=await categoryModel.aggregate([
        {
            $project:{
                id:"$_id",
                name:1,
                logo:1,
                _id:0,
            }
        }
    ]);
    return list;
}

async get_all_subcategory(cId){
    const subcategory=await categoryModel.aggregate([
        {
            $match:{
                _id:mongoose.Types.ObjectId(cId)
            }
        },
        {
            $unwind:"$subcategory"
        },
        {
            $project:{
                _id:0,
                subcategory:1
            }
        },
        
    ]);
    return subcategory;
}

async get_Single_Doctor(dId){
    const profile=doctorModel.aggregate([
        {
            $match:{
                _id:mongoose.Types.ObjectId(dId)
            }
        },
        {
            $project:{
                id:"$_id",
                name:1,
                
                _id:0,
            }
        }
    ]);
    return profile;
}


}

export default new UserService();