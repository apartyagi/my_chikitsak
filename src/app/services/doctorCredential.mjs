import express from "express";
const DCredrouter=express.Router();
import doctorController from "../controllers/doctorController.mjs";



DCredrouter.post('/login',doctorController.login);
DCredrouter.post('/resendOtp',doctorController.ResendOtp);
DCredrouter.post('/verify',doctorController.verifyOtp);
DCredrouter.post('/sign_up',doctorController.signUP);
DCredrouter.post('/change_password',doctorController.changePassword);







export default DCredrouter;