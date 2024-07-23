import express, { Router } from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import productRouter from './Router/productRouter.js';
import products from './products.js';
import userRouter from './Router/userRoutes.js'
import cookieParser from 'cookie-parser';
import orderRouter from './Router/orderRoutes.js';

dotenv.config();
connectDb();
const app = express();
const PORT = process.env.PORT;

//json middleware

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());


app.listen(`${PORT}`,()=>{
    console.log(`listening on port ${PORT}`);
})
app.get('/config/paypal' , (req,res)=> res.send({clientId : process.env.PAYPAL_CLIENT_ID}))

app.use('/products' , productRouter)
app.use('/users', userRouter)
app.use('/orders', orderRouter)