import express from "express";
const UCredrouter=express.Router();
import userModel from "../models/UserEntity.mjs";
import {hash} from "bcrypt";
import userService from "../services/userService.mjs";
import {success,error,validation} from "../../config/apiResponse.mjs";


UCredrouter.post('/sign_up',async(req,res)=>{
    try {   
        const request=req.body;
    //   userService.SignUp(request.)

    } catch (err) {
        res.json({op:"something went wrong"});
    }
});


UCredrouter.post('/sign_in',async(req,res)=>{
    try{
    const data=req.body;
        if(data.phone===undefined || data.type===undefined || data.password===undefined){
            return res.json(validation("please provide proper value"));
        }
        const output =await userService.loginUser(data);
        if (output.pop) {
            res.json(success(`${output.message}`,output.data,200));
        }else{
            res.json(error(`${output.message}`,500));
        }
    }catch(err){
        res.json(error("something went wrong"+err.message,500));
    }
});


UCredrouter.post('/resend_otp',(req,res)=>{
    
});


UCredrouter.post('/verify_otp',async(req,res)=>{
    try{
        const {otp,type,number}=req.body;
        if(otp===undefined || type===undefined || number===undefined){
            return res.json(validation("please provide proper value"));
        }else{
            const output =await userService.verifyOTP(number,otp,type).lean();
            res.json(success("your otp result",{message:"otp verified Succesfully",result:output},200));
        }
    }catch(err){
        res.json(error("Something went wrong",500));
    }
});




export default UCredrouter;