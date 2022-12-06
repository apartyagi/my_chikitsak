import express from 'express';
import userRoute from './src/app/routes/userRoutes.mjs';
import "./src/config/mongodb.mjs";
const app=express();
const port =process.env.PORT || 3001;


app.use(express.json());
app.use('/api/v1/users',userRoute);


app.all('*',(req,res)=>{
    res.json({
        status:false,
        message:"Error what are you try to find ??",
        solution:"please check your url again"
    })
})



app.listen(port,()=>{
    console.log(`Server listening on port   ${port}`)
})