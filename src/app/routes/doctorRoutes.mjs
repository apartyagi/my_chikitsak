import express from "express";
import doctorController from "../controllers/doctorController.mjs";
const DROuter=express.Router();


DROuter.get('/home',doctorController.getHome);
DROuter.get('/my_profile',doctorController.getMyProfile);


DROuter.get('/upcoming_orderg',doctorController.upcomingOrder);
DROuter.get('/completed_order',doctorController.completedOrder);
DROuter.get('/cancel_order',doctorController.cancelOrder);











export default DROuter;

