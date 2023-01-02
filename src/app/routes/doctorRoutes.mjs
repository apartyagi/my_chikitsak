import express from "express";
import doctorController from "../controllers/doctorController.mjs";
const DROuter=express.Router();

DROuter.use((req,res,next)=>{
    if(req.user.type!='doctor' || req.user.type==undefined || req.user.type==null){
       return  res.status(401).json({warning:"you are not a doctor i know"});
    }
    next();

})

DROuter.get('/home',doctorController.getHome);
DROuter.get('/my_profile',doctorController.getMyProfile);
DROuter.put('/upd_my_profile',doctorController.updateMyProfileController);
DROuter.put('/save_lat_lng',doctorController.saveLatLngAndCurrentAddressDoctor)




DROuter.get('/upcoming_order',doctorController.upcomingOrder);
DROuter.get('/completed_order',doctorController.completedOrder);
DROuter.get('/cancel_order',doctorController.cancelOrder);











export default DROuter;

