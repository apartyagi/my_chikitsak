import doctorModel from "../models/DoctorEntity.mjs";
import { hash,compare } from "bcrypt";
const RESPONSE=(pop,message,data)=>{
    return{
        pop:pop,
        message:message,
        data:data
    }
    c}
        
class DoctorService{

genrateOtp(){
        return Math.floor(1000 + Math.random() * 9000);
}

async loginUser(data){
    try {
        const userExist=await doctorModel.findOne({phone:data.phone});
        if(userExist===null){
            return RESPONSE(false,"no user found");
        }
        const securePassword=await compare(data.password,userExist.password);
        const result=await doctorModel.findOne({phone:data.phone,password:userExist.password,status:true},{id:"$_id",phone:1,name:1,dob:1,_id:0}).lean();
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
    
async sendOTPToUser(phone){
    try {
        const uExist=await doctorModel.findOne({phone:phone});
    if(uExist==null){
        return RESPONSE(false,"Number not resigtered");
    }else{
        const OTP=this.genrateOtp();
        const reSet=await doctorModel.findOneAndUpdate({_id:uExist._id},{$set:{otp:OTP,reverified:false}},{new: true});
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
        const uExist=await doctorModel.findOne({phone:phone,profileCompleted:true});
    if(uExist==null){
        const OTP=this.genrateOtp();
        const reSet=await doctorModel.findOneAndUpdate({phone:phone},{phone:phone,otp:OTP,status:false,verified:false,profileCompleted:false},{upsert:true,new:true});
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

async verifyOTPBusiness(phone,otp){
    try {
        const isExist=await doctorModel.findOne({phone:phone,otp:otp});
        if(isExist===null){
          return RESPONSE(false,"Invalid details");
        }else{
            const result=await doctorModel.findOneAndUpdate({_id:isExist._id},{$set:{otp:0,verified:true,reverified:true}},{new:true}).select('verified status phone');
            return RESPONSE(true,"Otp Verification Success",result);
        }
    
    } catch (err) {
        return RESPONSE(false,"something happened wrong");
    }
}

async changePassword(newPassword,id){
    try {
        const isUexist= await doctorModel.findOne({_id:id,otp:'0',verified:true,reverified:true,profileCompleted:true});
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


}


export default new DoctorService();