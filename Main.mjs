
import express from 'express';
import { authenticate } from './src/app/middlewares/authentication.mjs';
import userRoute from './src/app/routes/userRoutes.mjs';
import "./src/config/mongodb.mjs";
const app=express();
import UCredrouter from './src/app/services/Usercredential.mjs';
import DCredrouter from './src/app/services/doctorCredential.mjs';
const port =process.env.PORT || 3001;


app.use(express.json());
app.use('/user',UCredrouter);
app.use('/doctor',DCredrouter);
app.use('/api/v1/users',authenticate,userRoute);




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