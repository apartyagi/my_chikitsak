import express, { request } from "express";
const UCredrouter=express.Router();
import userModel from "../models/UserEntity.mjs";
import {hash} from "bcrypt";
import userService from "../services/userService.mjs";
import {success,error,validation} from "../../config/apiResponse.mjs";
import UserController from "../controllers/userController.mjs";


UCredrouter.post('/sign_up',(req,res)=>{});
UCredrouter.post('/sign_in',UserController.login)
UCredrouter.post('/resend_otp',UserController.resendOtp)
UCredrouter.post('/verify_otp',UserController.verifyOtp);
UCredrouter.post('/change_password',UserController.changePassword);




export default UCredrouter;