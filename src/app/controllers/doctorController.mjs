import { Error,Validation,Success } from "../../config/apiResponse.mjs";
import doctorService from "../services/doctorService.mjs";

class DoctorController{

static async signUP(req,res){}

static async login(req,res){
    try{
        const data=req.body;
        if(data.phone==undefined || data.type==undefined || data.password==undefined){
            return res.json(Validation("please provide proper value"));
        }
        const output =await doctorService.loginUser(data);
        if (output.pop) {
            res.json(Success(`${output.message}`,output.data,200));
        }else{
            res.json(Error(`${output.message}`,500));
        }
    }catch(err){
        res.json(Error("something went wrong"+err.message,500));
    }
}

static async ResendOtp(req,res){
    try{
        let output;
        const request=req.body;
        if(request.phone==undefined || request.type==undefined){
            return res.json(Validation("please provide proper value"));
        }
        if(request.type=='register'){
           output= await doctorService.otpRegistrationForSignUp(request.phone);
        }
        else if(request.type=='forget'){
           output=await doctorService.sendOTPToUser(request.phone);
        }
        if(output.pop){
            res.json(Success(`${output.message}`,output.data,200));
        }else{
            res.json(Error(`${output.message}`,206));
        }
    
       }catch(err) {
        res.json(Error(`something went wrong`,500));
       }
}

static async verifyOtp(req,res){
    try{
        const {otp,number}=req.body;
        if(otp==undefined || number==undefined){
            return res.json(Validation("please provide proper value"));
        }
         const output =await doctorService.verifyOTPBusiness(number,otp);
         if(output.pop){
             res.json(Success(`${output.message}`,output,200));
         }
         else{
            res.json(Error(`${output.message}`,206));
         }
    }catch(err){
        res.json(Error("Something went wrong",500));
    }
}

static async changePassword(req, res){
    try {
        const {oldPassword,newPassword,id}=req.body;
        if(oldPassword==undefined || newPassword==undefined || id==undefined || oldPassword!=newPassword){
            return res.json(Validation("please provide proper value"));
        }
        const output=await doctorService.changePassword(newPassword,id);
        if(output.pop){
            res.json(Success(`${output.message}`,200));
        }else{
            res.json(Error(`${output.message}`,206));    
        }

    } catch (err) {
        res.json(Error(`something went worng ${err.message}`,500));
    }
}

static async getHome(req,res){}    




static async upcomingOrder(req,res){}    
static async cancelOrder(req,res){}    
static async completedOrder(req,res){}    





static async getMyProfile(req,res){}

}



export default DoctorController;