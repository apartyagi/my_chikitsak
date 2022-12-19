import userModel from "../models/UserEntity.mjs";
import categoryModel from "../models/CategoriesEntity.mjs";
import mongoose from "mongoose";
import review from "../temp/temp.mjs";
import doctorModel from "../models/DoctorEntity.mjs";
import { hash,compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let RESPONSE=(pop,message,data)=>{
    return{
        pop:pop,
        message:message,
        data:data
    }
}


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
        const ty= await userModel.create({phone:phone,password:securePassword,status:false,verified:false});


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


async verifyOTPBusiness(phone,otp){
    try {
        const isExist=await userModel.findOne({phone:phone,otp:otp});
        if(isExist===null){
          return RESPONSE(false,"Invalid details");
        }else{
            const result=await userModel.findOneAndUpdate({_id:isExist._id},{$set:{otp:0}},{new:true});
            return RESPONSE(true,"Otp Verification Success",result);
        }
    
    } catch (err) {
        return RESPONSE(false,"something happened wrong");
    }
}

async changePassword(newPassword,id){
    try {
        const isUexist= await userModel.findOne({_id:id,otp:'0'});
        if(isUexist===null){
            return RESPONSE(false,"User is not verified");
        }else{
            const updEncPass=await hash(newPassword,10);
            await userModel.findOneAndUpdate({_id:isUexist._id},{$set:{password:updEncPass}});
            return RESPONSE(true,"Password Change Successfully");
        }
    } catch (err) {
        return RESPONSE(false,"Something happened wrong");
    }

}


async home(){
    const activeDoctor=4;
    return {
        activeDoctor:4,
        review:review
    }
}

async save_userDetails_latLngDevice(lat,lng,token,id,address){
    try {
        const pp={
            lat:lat,
            lng:lng,
            deviceToken:token,
            address:address
        }
        const isUserExist=await userModel.findOne({_id:id});
        if(isUserExist===null){
            return RESPONSE(false,"No User Exist With These Details");     
        }
       await userModel.findOneAndUpdate({_id:id},{$set:pp});        
       return RESPONSE(true,"lat long save Successfully");
    } catch (err) {
        return RESPONSE(false,"Error While saving your details");
    }

}

async get_all_category(){
    const list=await categoryModel.aggregate([
        {
            $project:{
                id:"$_id",
                name:1,
                logo:1,
                bgColor:1,
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



genrateOtp(){
    return Math.floor(1000 + Math.random() * 9000);
}

async sendOTPToUser(phone){
    try {
        const uExist=await userModel.findOne({phone:phone});
    if(uExist==null){
        return RESPONSE(false,"Number not resigtered");
    }else{
        const OTP=this.genrateOtp();
        const reSet=await userModel.findOneAndUpdate({_id:uExist._id},{$set:{otp:OTP}},{ new: true});
        let oo={
            id:reSet._id,
            phone:reSet.phone,
            otp:reSet.otp
        }
        return RESPONSE(true,"otp send succesfully to your number",oo);
    }

    } catch (err) {
         return RESPONSE(false,"Something Went Wrong");
    }
}




async getMyProfile(id){
    try {
        const userExist=await userModel.findOne({_id:id},{id:"$_id",phone:1,dob:1,address:1,image:1,email:1,gender:1,_id:0});
        if(userExist===null){
            return RESPONSE(false,"No User Found With this ID");
        }
        else{
            return RESPONSE(true,"here is user details",userExist);
        }
    } catch (err) {
        return RESPONSE("false","something went wrong while fetch your profile");
    }
}

}

export default new UserService();