import userModel from "../models/UserEntity.mjs";
import categoryModel from "../models/CategoriesEntity.mjs";
import mongoose from "mongoose";
import review from "../temp/temp.mjs";
import doctorModel from "../models/DoctorEntity.mjs";
import { hash,compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class UserService{

async findUserById(UID){
    try{
        const user=await userModel.findOne({_id:UID});
        if(user==null){
            return {pop:false,message:"No user Found"};
        }else{
            return {pop:true,message:"User found",data:user};
        }
        }
    catch(err){
        return {pop:false,message:"No user Found something went wrong"};
    }
}


async SignUp(data){
    try{
        const {phone,password}=req.body;
        const securePassword=await hash(password,10)
        const ty= await userModel.create({phone:phone,password:securePassword,});
        

    }catch(err){
        return {pop:false,message:"somrting wrong with your value"};
    }

}


async loginUser(data){
    const userExist=await userModel.findOne({phone:data.phone});
    if(userExist===null){
        return {pop:false,data:"",message:"no user found"};
    }
    const securePassword=await compare(data.password,userExist.password);
    const result=await userModel.findOne({phone:data.phone,password:userExist.password},{id:"$_id",phone:1,name:1,dob:1,_id:0}).lean();
    if(!securePassword){
        return {pop:false,data:"",message:"user name or password is incorrect"};
    }else{
        const user={id:result.id};
        const accessToken=jwt.sign(user,process.env.JWT_SECRET_KEY);
        result.accessToken=accessToken;
        result.refreshToken="sajbfjkabfjbasjfasf6sa5f6sa1f6asdmnakjdbhwdwq546d489wq4$%^";
        return {pop:true,data:result,message:"login successfully"};
    }
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