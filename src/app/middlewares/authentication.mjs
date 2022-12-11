import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {error,success} from "../../config/apiResponse.mjs";
dotenv.config();


const authenticate=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1];
    if(token==null){
        return res.status(401).json(error(`You are not authorized to access this API`,401));
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
     if(err)  return res.status(403).json(error(`You are not a valid user`,403));
     req.user=user;
     next();
    })

}

export {authenticate};