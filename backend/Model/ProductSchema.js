import mongoose, { Model, Schema } from "mongoose";
import { type } from "os";

const ProductSchema = new mongoose.Schema({
    name:{
      type: mongoose.Schema.Types.ObjectId,
      required : true,
      ref : "User"
    },
    name:{
        type:String,
        required : true
    },
    image:{
        type:String,
        required : true
    },
    description:{
        type:String,
        required : true
    },
    brand:{
        type:String,
        required : true
    },
    category:{
        type:String,
        required : true
    },
    price:{
        type:String,
        required : true
    },
    countInStock:{
        type:Number,
        required : true,
        default:0
    },
    rating:{
        type:Number,
        required : true,
        default:0
    },
    numReviews:{
        type:Number,
        required : true,
        default:0
    }

},{
    timestamps:true
})

const productModel = mongoose.model("Product" , ProductSchema);

export default productModel;