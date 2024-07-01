import express, { Router } from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import productRouter from './Router/productRouter.js';
import products from './products.js';


dotenv.config();
connectDb();
const app = express();
const PORT = process.env.PORT;


app.listen(`${PORT}`,()=>{
    console.log(`listening on port ${PORT}`);
})

app.use('/products' , productRouter)