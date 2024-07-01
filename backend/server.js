import express from 'express'
import dotenv from 'dotenv'
import products from './products.js';
import connectDb from './config/db.js';


dotenv.config();
connectDb();
const app = express();
const PORT = process.env.PORT;

app.get('/' ,(req,res)=>{
    res.send('Api is running successfully');
})

app.get('/products' , (req,res)=>{
    res.json(products);
})

app.get('/product/:id' , (req,res)=>{
    const product = products.find(product => product._id === req.params.id);
    res.json(product);
})

app.listen(`${PORT}`,()=>{
    console.log(`listening on port ${PORT}`);
})