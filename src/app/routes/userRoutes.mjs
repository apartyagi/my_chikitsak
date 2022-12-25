"use strict";
import express from "express";
import UserController from "../controllers/userController.mjs";
var userRoute=express.Router();


userRoute.get('/',UserController.testController);

userRoute.get('/home',UserController.home);
userRoute.put('/common-details',UserController.saveLatLongAndDeviceToken);


userRoute.get('/get_all_category',UserController.getAllCategory);
userRoute.get('/get_sub_cat',UserController.getAllSubCategory);


userRoute.get('/get_all_category_online',UserController.getAllCategoryOnline);
userRoute.get('/get_sub_cat_online',UserController.getAllSubCategoryOnline);



userRoute.get('/avilable_doc_home',UserController.bookHomeVisit);
userRoute.get('/avilable_doc_online',UserController.bookOnlineConsulat);
userRoute.get('/avilable_lab_test',UserController.bookLabtest);


userRoute.get('/get_single_doc_online_booking',UserController.bookLabtest);

userRoute.post('/book_home_visit',UserController.bookHomeVisit);
userRoute.post('/book_online_consult',UserController.bookOnlineConsulat);
userRoute.post('book_lab_test',UserController.bookLabtest);



userRoute.get('/my_profile',UserController.get_my_profile);
userRoute.put('/my_profile/:userId',UserController.update_my_profile);




export default userRoute;