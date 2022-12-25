import userService from "../services/userService.mjs";
import {Error, Success, Validation} from '../../config/apiResponse.mjs';

class UserController{
 
static async testController(req,res){

        res.json({Success:true});
}


static async SignUpC(req,res){
    try {
        const {name,dob,password,email,gender}=req.body;
        const id=req.params.id;
        if(name==undefined || dob==undefined || password==undefined ||email==undefined ||gender==undefined){
            return Validation("please provide proper value");
        }
        const output =await userService.SignUp(id,req.body);
        console.log(output);
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
        const output =await userService.loginUser(data);
        if (output.pop) {
            res.json(Success(`${output.message}`,output.data,200));
        }else{
            res.json(Error(`${output.message}`,500));
        }

        // userService.loginUser(phone,type);
        // res.json(success("success",{message:"opt Send to your Mobile no"},200));
        
    }catch(err){
        res.json(Error("something went wrong"+err.message,500));
    }
}

static async verifyOtp(req,res){
    try{
        const {otp,number}=req.body;
        if(otp==undefined || number==undefined){
            console.log("otp,6969");
            return res.json(Validation("please provide proper value"));
        }
         const output =await userService.verifyOTPBusiness(number,otp);
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

static async resendOtp(req,res){
   try{
    let output;
    const request=req.body;
    if(request.phone==undefined || request.type==undefined){
        return res.json(Validation("please provide proper value"));
    }
    if(request.type=='register'){
       output= await userService.otpRegistrationForSignUp(request.phone);
    }
    else if(request.type=='forget'){
       output=await userService.sendOTPToUser(request.phone);
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


static async changePassword(req,res){
    try {
        const {oldPassword,newPassword,id}=req.body;
        if(oldPassword==undefined || newPassword==undefined || id==undefined || oldPassword!=newPassword){
            return res.json(Validation("please provide proper value"));
        }
        const output=await userService.changePassword(newPassword,id);
        if(output.pop){
            res.json(Success(`${output.message}`,200));
        }else{
            res.json(Error(`${output.message}`,206));    
        }

    } catch (err) {
        res.json(Error(`something went worng ${err.message}`,500));
    }
}


static async home(req,res){
    try{
        console.log(req.body);
        console.log(req.user)
        const data=await userService.home();
        res.json(Success("home page data",data,200));
    }catch(err){
        res.json(Error("Something went wrong"+err.message,500));
    }
}

static async saveLatLongAndDeviceToken(req,res){
    try{
        const {id,lat,lng,token,type,address}=req.body;
        if(id==undefined || lat==undefined || token==undefined || address==undefined){
            return res.json(Validation("please provide all parameters"));
        }
        const output=await userService.save_userDetails_latLngDevice(lat,lng,token,id,address);
        if(output.pop==true){
            res.json(Success(`${output.message}`,{status:true},200));
        }else{
            res.json(Error(`${output.message}`,400));    
        }
    
    }catch(err){
        res.json(Error("Something went wrong",500));
    }
}
    

static async getAllCategory(req,res){
    try{
        const data=await userService.get_all_category();
        if(data.length>0){
            return res.json(Success("list of all category",data,200));
        }else{
            return res.json(Success("no category exists",[],200));
        }

    }catch(err){
        res.json(Error("Something went wrong"+err.message,500));
    }
}

static async getAllSubCategory(req,res){
    try{
        const categoryId=req.query.catId;
        if(categoryId==undefined){
            return res.json(Validation("please provide proper fields"));
        }
        const data=await userService.get_all_subcategory(categoryId);
        if(data.length>0){
            return res.json(Success("list of all category",data,200));
        }else{
            return res.json(Success("no subcategory exists",[],200));
        }
    }catch(err){
        res.json(Error("something went wrong"+err.message,500));
    }
}



static async getAllCategoryOnline(req,res){
    try{
        const data=await userService.get_all_category();
        if(data.length>0){
            return res.json(Success("list of all category",data,200));
        }else{
            return res.json(Success("no category exists",[],200));
        }

    }catch(err){
        res.json(Error("Something went wrong"+err.message,500));
    }
}

static async getAllSubCategoryOnline(req,res){
    try{
        const categoryId=req.query.catId;
        if(categoryId==undefined){
            return res.json(Validation("please provide proper fields"));
        }
        const data=await userService.get_all_subcategory(categoryId);
        if(data.length>0){
            return res.json(Success("list of all category",data,200));
        }else{
            return res.json(Success("no subcategory exists",[],200));
        }
    }catch(err){
        res.json(Error("something went wrong"+err.message,500));
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
    if(id==undefined){
        return res.json(Validation("please provide proper fields"));
    }
    const output = await userService.getMyProfile(id);
    if(output.pop){
        res.json(Success(`${output.message}`,output.data,200));
    }else{
        res.json(Error(`${output.message}`,206));
    }
} catch (er) {
    res.json(Error("Something went wrong"+err.message,500));
}

}

static async update_my_profile(req,res){
try {
    const profile=req.body;
    const id=req.params.userId;
    if(profile.phone==undefined ||profile.address==undefined || profile.dob==undefined || profile.email==undefined || profile.gender==undefined || profile.image==undefined){
        return res.json(Validation("please provide proper fields"));
    }
    const output =await userService.updateMYProfile(id,profile);
    if(output.pop){
        res.json(Success(`${output.message}`,output.data,200));
    }
    else{
        res.json(Error(`${output.message}`,306));
    }


} catch (err) {
    res.json(Error("something went wrong",500));    
}

}









}
export default UserController;