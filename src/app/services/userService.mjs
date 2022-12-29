import userModel from "../models/UserEntity.mjs";
import categoryModel from "../models/CategoriesEntity.mjs";
import onlineCategoryModel from "../models/OnlineCategoryEntity.mjs";
import mongoose from "mongoose";
import review from "../temp/temp.mjs";
import doctorModel from "../models/DoctorEntity.mjs";
import { hash,compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const RESPONSE=(pop,message,data)=>{
    return{
        pop:pop,
        message:message,
        data:data
    }
}


class UserService {



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


async SignUp(id,data){
    try{
        const {name,password,dob,email,gender}=data;
        const isuserVerified=await userModel.findOne({_id:id,verified:true,profileCompleted:true});
        if(isuserVerified===null){
            const securePassword=await hash(password,10);
            const ty= await userModel.findOneAndUpdate({_id:id},{$set:{name:name,password:securePassword,status:true,dob:dob,email,gender,profileCompleted:true}},{new:true}).select('phone profileCompleted verified ');
            return RESPONSE(true,"registered",ty);
        }
        return RESPONSE(false,"user is not verified Or Already Registered",206);

    }catch(err){
        return RESPONSE(false,"somrting wrong with your value");
    }

}


async loginUser(data){
    try {
        const userExist=await userModel.findOne({phone:data.phone});
        if(userExist===null){
            return RESPONSE(false,"no user found");
        }
        const securePassword=await compare(data.password,userExist.password);
        const result=await userModel.findOne({phone:data.phone,password:userExist.password,status:true},{id:"$_id",phone:1,name:1,dob:1,_id:0}).lean();
        if(!securePassword){
            return RESPONSE(false,"user name or password is incorrect");
        }
        else if(result===null){
            return RESPONSE(false,"no account found");
        }
        else{
            const user={id:result.id};
            const accessToken=jwt.sign(user,process.env.JWT_SECRET_KEY);
            result.accessToken=accessToken;
            result.refreshToken="sajbfjkabfjbasjfasf6sa5f6sa1f6asdmnakjdbhwdwq546d489wq4$%^";
            return RESPONSE(true,"login successfully",result);
        }   
    } catch (err) {
        
    }
}


async verifyOTPBusiness(phone,otp){
    try {
        const isExist=await userModel.findOne({phone:phone,otp:otp});
        if(isExist===null){
          return RESPONSE(false,"Invalid details");
        }else{
            const result=await userModel.findOneAndUpdate({_id:isExist._id},{$set:{otp:0,verified:true,reverified:true}},{new:true}).select('verified status phone');
            return RESPONSE(true,"Otp Verification Success",result);
        }
    
    } catch (err) {
        return RESPONSE(false,"something happened wrong");
    }
}

async changePassword(newPassword,id){
    try {
        const isUexist= await userModel.findOne({_id:id,otp:'0',verified:true,reverified:true,profileCompleted:true});
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


async get_all_categoryOnline(){
    const list=await onlineCategoryModel.aggregate([
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

async get_all_subcategoryOnline(cId){
    const subcategory=await onlineCategoryModel.aggregate([
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
        const reSet=await userModel.findOneAndUpdate({_id:uExist._id},{$set:{otp:OTP,reverified:false}},{new: true});
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


async otpRegistrationForSignUp(phone){
    try {
        const uExist=await userModel.findOne({phone:phone,profileCompleted:true});
    if(uExist==null){
        const OTP=this.genrateOtp();
        const reSet=await userModel.findOneAndUpdate({phone:phone},{phone:phone,otp:OTP,status:false,verified:false,profileCompleted:false},{upsert:true,new:true});
        let oo={
            id:reSet._id,
            phone:reSet.phone,
            otp:reSet.otp
        }
        return RESPONSE(true,"otp send succesfully to your number",oo);
    }
    else{
        return RESPONSE(false,"Number already resigtered");
        }
    }
     catch (err) {
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


async updateMYProfile(id,user){
    try {
        const myupdProfile=await userModel.findOneAndUpdate({_id:id},{$set:user},{new:true}).select('name phone dob email gender image');
        return RESPONSE(true,"profile updated succesfully",myupdProfile,200);
    } catch (err) {
        return RESPONSE(false,"something has gone wrong.",500);
    }
}




}

export default new UserService();