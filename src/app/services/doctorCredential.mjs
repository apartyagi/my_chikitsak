import express from "express";
const DCredrouter=express.Router();
import doctorController from "../controllers/doctorController.mjs";



DCredrouter.post('/login',doctorController.login);
DCredrouter.post('/resendOtp',doctorController.ResendOtp);
DCredrouter.post('/verify',doctorController.verifyOtp);
DCredrouter.post('/sign_up',doctorController.signUP);
DCredrouter.post('/service_type',doctorController.serviceType);
DCredrouter.post('/time_slot',doctorController.timeSlots);
DCredrouter.post('/range',doctorController.range);







export default DCredrouter;