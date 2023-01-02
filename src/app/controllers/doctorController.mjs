import { Error,Validation,Success } from "../../config/apiResponse.mjs";
import doctorService from "../services/doctorService.mjs";


class DoctorController{

static async signUP(req,res){
    try {
        const {name,mciNo,password,email,gender,address,serviceType,servieDays,range,fees,speciality,experience,aadharNo}=req.body;
        const id=req.params.id;
        if(name==undefined || address==undefined || password==undefined ||email==undefined || gender==undefined || mciNo==undefined ||aadharNo==undefined || experience==undefined || speciality==undefined || fees==undefined || range==undefined || servieDays==undefined || serviceType==undefined){
            return Validation("please provide proper value");
        }
        const output =await doctorService.signUpByDoctor(id,req.body);
        if(output.pop){
            res.json(Success(`${output.message}`,output.data,200));
        }else{
            res.json(Error(`${output.message}`,306));
        }
    } catch (err) {
        res.json(Error(`Something wrong happaned`+err.message,500));
    }
}

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

static async getHome(req,res){
try {
    const {id}=req.user;
    console.log(id);
    const output =await doctorService.getHomePageForDoctor(id);
    res.json(Success('here is your home page data',output.data,200));
    
} catch (error) {
    re.json(Error('something went worng',500));
}

}    

static async getTimeSlots(req,res){
try {
    const output=await doctorService.getAllAvilableTimeSlots();
    if(output.pop){
        res.json(Success(true,output.data,200));
    }
    
} catch (err) {
    res.json(Error(`something went worng ${err.message}`,500));
}

}  

static async saveLatLngAndCurrentAddressDoctor(req,res){
    try {
        const {id}=req.user;
        const data=req.body;
        if(data.lat==undefined || data.lng==undefined || data.currentLocation==undefined){
            return res.json(Validation("please provide proper value"));

        }
        const output=await doctorService.saveLatLongForDoctor(id,data);
        if(output.pop){
            res.json(Success(`${output.message}`,output.data,200));
        }else{
            res.json(Error(output.message,500));
        }
    } catch (error) {
        res.json(Error("something went worng",500));
    }
}





static async upcomingOrder(req,res){
    try {
        const {id}=req.user;
        const output=await doctorService.getAllUpcomingMeetings(id);
        if(output.pop){
            res.json(Success(`${output.message}`,output.data,200));
        }else{
            res.json(Error(`${output.message}`,500));

        }
    } catch (error) {
        res.json(Error("something went worng",500));
    }
}    
static async cancelOrder(req,res){
    try {
        const {id}=req.user;
        const output=await doctorService.getAllCancelMeetings(id);
        if(output.pop){
            res.json(Success(`${output.message}`,output.data,200));
        }else{
            res.json(Error(`${output.message}`,500));

        }
    } catch (error) {
        res.json(Error("something went worng",500));
    }
}    
static async completedOrder(req,res){
    try {
        const {id}=req.user;
        const output=await doctorService.getAllCompletedMeetings(id);
        if(output.pop){
            res.json(Success(`${output.message}`,output.data,200));
        }else{
            res.json(Error(`${output.message}`,500));

        }
    } catch (error) {
        res.json(Error("something went worng",500));
    }
}    





static async getMyProfile(req,res){
    try {
      const {id} =req.user;
     const output=await doctorService.getMyProfileBL(id);
     if(output.pop){
        res.json(Success(`${output.message}`,output.data,200));
     }else{
        res.json(Error(`${output.message}`,500));
        
     }
    } catch (error) {
        res.json(Error('error while processing youtr request',500));
    }
}


static async updateMyProfileController(req,res){
    try {
        const data=req.body;
        const {id}=req.user;
        if(data.phone==undefined){  
            return res.json(Validation("please provide proper value"));
        }
        const output =await doctorService.updateMyProfileBL(id,data);
        if(output.pop){
            res.json(Success(`${output.message}`,output.data,200));
        }else{
            res.json(Error(`${output.message}`,500));
            
        }

    } catch (error) {
        res.json(Error("error while updating",500))
    }
}







}



export default DoctorController;