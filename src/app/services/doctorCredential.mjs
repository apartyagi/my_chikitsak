import express from "express";
const DCredrouter=express.Router();



DCredrouter.post('/sign_up',(req,res)=>{
  res.json({op:"inside doctor signup"}); 
})

DCredrouter.post('/login',(req,res)=>{
    res.json({op:"inside doctor login"});
});


export default DCredrouter;