import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

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

UserSchema.methods.matchPassword = async function matchPassword(enteredPassword){
   return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const userModel = mongoose.model("User" , UserSchema)

export default userModel;