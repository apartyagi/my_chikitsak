import express, { request } from "express";
const UCredrouter=express.Router();
import UserController from "../controllers/userController.mjs";


UCredrouter.post('/sign_up/:id',UserController.SignUpC);
UCredrouter.post('/sign_in',UserController.login)
UCredrouter.post('/resend_otp',UserController.resendOtp)
UCredrouter.post('/verify_otp',UserController.verifyOtp);
UCredrouter.post('/change_password',UserController.changePassword);




export default UCredrouter;