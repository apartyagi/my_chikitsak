import userService from "../services/userService.mjs";
import {error, success, validation} from '../../config/apiResponse.mjs';

class UserController{
 
static async testController(req,res){

        res.json({success:true});
}

static async login(req,res){
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

        // userService.loginUser(phone,type);
        // res.json(success("success",{message:"opt Send to your Mobile no"},200));
        
    }catch(err){
        res.json(error("something went wrong"+err.message,500));
    }
}

static async verifyOtp(req,res){
    try{
        const {otp,number}=req.body;
        if(otp==undefined || number==undefined){
            console.log("otp,6969");
            return res.json(validation("please provide proper value"));
        }
         const output =await userService.verifyOTPBusiness(number,otp);
         if(output.pop){
             res.json(success(`${output.message}`,output,200));
         }
         else{
            res.json(error(`${output.message}`,206));
         }
    }catch(err){
        res.json(error("Something went wrong",500));
    }
}

static async resendOtp(req,res){
   try{
    const request=req.body;
    if(request.phone==undefined){
        return res.json(validation("please provide proper value"));
    }
    const output=await userService.sendOTPToUser(request.phone);
    if(output.pop){
        res.json(success(`${output.message}`,output.data,200));
    }else{
        res.json(error(`${output.message}`,206));
    }

   }catch(err) {
    res.json(error(`something went wrong`,500));
   }
}


static async changePassword(req,res){
    try {
        const {oldPassword,newPassword,id}=req.body;
        if(oldPassword==undefined || newPassword==undefined || id==undefined || oldPassword!=newPassword){
            return res.json(validation("please provide proper value"));
        }
        const output=await userService.changePassword(newPassword,id);
        if(output.pop){
            res.json(success(`${output.message}`,200));
        }else{
            res.json(error(`${output.message}`,206));    
        }

    } catch (err) {
        res.json(error(`something went worng ${err.message}`,500));
    }
}


static async home(req,res){
    try{
        console.log(req.body);
        console.log(req.user)
        const data=await userService.home();
        res.json(success("home page data",data,200));
    }catch(err){
        res.json(error("Something went wrong"+err.message,500));
    }
}

static async saveLatLongAndDeviceToken(req,res){
    try{
        const {id,lat,lng,token,type,address}=req.body;
        if(id==undefined || lat==undefined || token==undefined || address==undefined){
            return res.json(validation("please provide all parameters"));
        }
        const output=await userService.save_userDetails_latLngDevice(lat,lng,token,id,address);
        if(output.pop==true){
            res.json(success(`${output.message}`,{status:true},200));
        }else{
            res.json(error(`${output.message}`,400));    
        }
    
    }catch(err){
        res.json(error("Something went wrong",500));
    }
}
    

static async getAllCategory(req,res){
    try{
        const data=await userService.get_all_category();
        if(data.length>0){
            return res.json(success("list of all category",data,200));
        }else{
            return res.json(success("no category exists",[],200));
        }

    }catch(err){
        res.json(error("Something went wrong"+err.message,500));
    }
}

static async getAllSubCategory(req,res){


    try{
        const categoryId=req.query.catId;
        const data=await userService.get_all_subcategory(categoryId);
        if(data.length>0){
            return res.json(success("list of all category",data,200));
        }else{
            return res.json(success("no subcategory exists",[],200));
        }
    }catch(err){
        res.json(error("something went wrong"+err.message,500));
    }
}


static async getAllDoctorsNearby(req,res){

}


static async getTotalNumberOfDoctorWorkingWithUs(req,res){

}

static async bookHomeVisit(req,res){

}

static async bookOnlineConsulat(req,res){
    const{subId} =req.body;
    
}

static async bookLabtest(req,res){

}


static async get_my_profile(req,res){
try {
    const {id}=req.user;
    const output = await userService.getMyProfile(id);
    if(output.pop){
        res.json(success(`${output.message}`,output.data,200));
    }else{
        res.json(error(`${output.message}`,206));
    }
} catch (error) {
    res.json(error("Something went wrong"+err.message,500));
}

}

static async update_my_profile(req,res){
try {
    
} catch (error) {
    
}
}









}
export default UserController;