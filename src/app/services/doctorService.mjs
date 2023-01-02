import doctorModel from "../models/DoctorEntity.mjs";
import timeSlotModel from "../models/TimeSlots.mjs"
import { hash,compare } from "bcrypt";
import jwt from "jsonwebtoken";
import review from "../temp/temp.mjs";
import userModel from "../models/UserEntity.mjs";
import containerModel from "../models/Container.mjs";
const RESPONSE=(pop,message,data)=>{
    return{
        pop:pop,
        message:message,
        data:data
    }
    }
        
class DoctorService{


async signUpByDoctor(id,data){
    try {
        const isdocVerified=await doctorModel.findById({_id:id,status:false});
        if(isdocVerified==null){
            return RESPONSE(false,"user is not verified or already registered",206);
        }
        const securePassword = await hash(data.password,10);
        data.password=securePassword;
        data.profileCompleted=true;
        data.status=false;
        const newData=await doctorModel.findByIdAndUpdate({_id:id},data,{new:true}).select('_id phone profileCompleted');
        return RESPONSE(true,"success",newData);
    } catch (error) {
        return RESPONSE(false,"something wrong happened");
    }
}


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
            return RESPONSE(false,"no account found or u are not allowed yet"); 
        }
        else{
            const user={id:result.id,type:'doctor'};
            const accessToken=jwt.sign(user,process.env.JWT_SECRET_KEY);
            result.accessToken=accessToken;
            result.refreshToken="sajbfjkabfjbasjfasf6sa5f6sa1f6asdmnakjdbhwdwq546d489wq4$%^";
            return RESPONSE(true,"login successfully",result);
        }   
    } catch (err) {
        return RESPONSE(false,"something wrong happened"+err.message);
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

async getAllAvilableTimeSlots(){
    try {
        const data= await timeSlotModel.find({},{id:"$og",_id:0,name:1});
        return RESPONSE(true,"all avilabe time slots",data);
    } catch (error) {
        return RESPONSE(false,"Something happened wrong");
    }
}

async getAllServices(){
    try {
        // const data= await serviceModel.find({},{id:0,name:1});
        return RESPONSE(true,"all services","data");
    } catch (error) {
        return RESPONSE(false,"Something happened wrong");
    }
}



async getHomePageForDoctor(id){
    const totalUser=await userModel.count();
    let isActiveMeetings=false;
    const activeMeeting=[
    //     {
    //     id:'ajdbjd51515',
    //     name:"Vinnet Sharma",
    //     date:"Wednesday 25 January",
    //     time:"08:00 AM",
    //     img:"https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737__480.jpg"
    // }
        ];
    return RESPONSE(true,'home page for user',{totalUser,review,activeMeeting,isActiveMeetings});
}

async saveLatLongForDoctor(id,data){
    try {
        console.log(id)
        await doctorModel.findByIdAndUpdate({_id:id},{lat:data.lat,lng:data.lng,currentLocation:data.currentLocation});
        return RESPONSE(true,"data saved successfully");
    } catch (error) {
        return RESPONSE(false,"somrthing wrong happened");
    }
}

async getMyProfileBL(id){
    try {
        const data=await doctorModel.findOne({_id:id},{id:"$_id",_id:0,name:1,email:1,mciNo:1,aadharNo:1,experience:1,range:1,fees:1,status:1,image:1,gender:1,phone:1});
        if(data==null){
            return RESPONSE(false,"User not found");
        }
        else{
            return RESPONSE(true,'here is your profile',data);
        }
    } catch (error) {
        return RESPONSE(false,"somrthing wrong happened"+err);
    }
}

async updateMyProfileBL(id,data){
    try {
        const isDocExist=await doctorModel.findOne({_id:id});
        if(isDocExist==null){
            return RESPONSE(false,"User not found");   
        }
        await doctorModel.findOneAndUpdate({_id:id},data);
       return RESPONSE(true,"profile update succesfully");
    } catch (error) {
        return RESPONSE(false,"somrthing wrong happened");
    }
}





async getAllUpcomingMeetings(id){
    try {
        const data=[
            {
            name:"amit gupta",
            date:"wednesday jan 21",
            time:"09:00 PM",
            id:"ikddknd55d4f5465",
            image:"https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737__480.jpg"
            },
            {
                name:"amit gupta",
                date:"wednesday jan 21",
                time:"09:00 PM",
                id:"ikddknd55d4f5465",
                image:"https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737__480.jpg"
            }
        ]
        return RESPONSE(true,"here is all upcoming meetings",data);
    } catch (error) {
        return RESPONSE(false,"somrthing wrong happened");
    }
}

async getAllCompletedMeetings(id){
    try {
        const data=[
            {
            name:"amit gupta",
            date:"wednesday jan 21",
            time:"09:00 PM",
            id:"ikddknd55d4f5465",
            image:"https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737__480.jpg"
            },
            {
                name:"amit gupta",
                date:"wednesday jan 21",
                time:"09:00 PM",
                id:"ikddknd55d4f5465",
                image:"https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737__480.jpg"
            }
        ]
        return RESPONSE(true,"here is all completed orders",data);
    } catch (error) {
        return RESPONSE(false,"somrthing wrong happened");
    }
}

async getAllCancelMeetings(id){
    try {
        const data=[
            {
            name:"amit gupta",
            date:"wednesday jan 21",
            time:"09:00 PM",
            id:"ikddknd55d4f5465",
            image:"https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737__480.jpg"
            },
            {
                name:"amit gupta",
                date:"wednesday jan 21",
                time:"09:00 PM",
                id:"ikddknd55d4f5465",
                image:"https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737__480.jpg"
            }
        ]
        return RESPONSE(true,"here is all cancel orders",data);
    } catch (error) {
        return RESPONSE(false,"somrthing wrong happened");
    }
}





// async getPrivacyPolicyBL(){
//     try {
//        const data=await containerModel.findOne({UID:1,type:'privacy',whom:'user'},{_id:0,body:1,id:"$_id"})
//        return RESPONSE(true,'here is privacy policy',data);
//     } catch (error) {
//         return RESPONSE(false,"somrthing wrong happened");
//     }
// }

// async getCancellationPolicyBL(){
//     try {
//        const data=await containerModel.findOne({UID:2,type:'cancel',whom:'user'},{_id:0,body:1,id:"$_id"})
//        return RESPONSE(true,'here is cancellation policy',data);
//     } catch (error) {
//         return RESPONSE(false,"somrthing wrong happened");
//     }
// }


// async getTermsAndConditionsBL(){
//     try {
//        const data=await containerModel.findOne({UID:3,type:'terms',whom:'user'},{_id:0,body:1,id:"$_id"})
//        return RESPONSE(true,'here is terms and conditions',data);
//     } catch (error) {
//         return RESPONSE(false,"somrthing wrong happened");
//     }
// }

}


export default new DoctorService();