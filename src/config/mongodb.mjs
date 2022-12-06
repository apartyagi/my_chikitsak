import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL,{useNewUrlParser: true,useUnifiedTopology: true,}).then(()=>{console.log("SuccessFully Connected To MongoDb Atlas")}).catch(err=>{console.log("error ",err.message)});
