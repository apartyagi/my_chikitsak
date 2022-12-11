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
}

static async resendOtp(req,res){
   try{

   }catch(err) {

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
        const {id,lat,lng,token,type}=req.body;
        const status=await userService.save_userDetails_latLngDevice(lat,lng,token,id);
        if(status==true){
            res.json(success("data save successfully",{status:true},200));
        }else{
            res.json(error("check your user id and value",400));    
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

static async getTopFive1ClientReview(req,res){

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
    
} catch (error) {
    
}
}

static async update_my_profile(req,res){
try {
    
} catch (error) {
    
}
}









}
export default UserController;