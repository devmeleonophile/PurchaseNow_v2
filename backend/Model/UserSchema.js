import mongoose from "mongoose";
import { type } from "os";

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required: true,
        
    },

    isAdmin : {
        type: String,
        required : true,
        default : false
    }
},{
    timestamps : true
})

const userModel = mongoose.model("User" , UserSchema)

export default userModel;