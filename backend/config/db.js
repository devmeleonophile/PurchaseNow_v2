import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const mongouri = process.env.MONGO_URI;

const connectDb = async()=>{
    try {
    const connect = await mongoose.connect(mongouri)
    console.log(`connected to db successfully : ${connect.connection.host}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }

}


export default connectDb;