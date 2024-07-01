import mongoose from "mongoose";
import orderModel from "./Model/orderSchema.js";
import userModel from "./Model/UserSchema.js";
import productModel from "./Model/ProductSchema.js";
import colors from 'colors';
import Users from './Data/Users.js';
import dotenv from 'dotenv';
import connectDb from "./config/db.js";
import products from "./products.js";
import users from "./Data/Users.js";

dotenv.config();

connectDb();

const importData =async()=>{

    try {

        await orderModel.deleteMany();
        await productModel.deleteMany();
        await userModel.deleteMany();

        const createUsers = await userModel.insertMany(Users);

        const adminUser = createUsers[0]._id;

        const sampleData = products.map((product)=>{
            return {...product, user: adminUser};
        })
         
         await productModel.insertMany(sampleData);
        
         console.log("Data imported" .green.inverse);
         process.exit();
        
    } catch (error) {
        
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }

}

const destroyData = async() =>{
    try {
        await orderModel.deleteMany();
        await userModel.deleteMany();
        await productModel.deleteMany();

        console.log('Data destryed' .green.inverse);
        process.exit();
        
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}
