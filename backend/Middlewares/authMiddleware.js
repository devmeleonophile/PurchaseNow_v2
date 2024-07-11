import userModel from "../Model/UserSchema.js";
import jwt from 'jsonwebtoken'

//protect routes

const protect = async(req,res,next)=>{
    let token;

    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }



    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log('Decoded:', decoded.userId);
            req.user = await userModel.findById(decoded.userId).select('-password');
            console.log('User:', req.user);
            next();
            
        } catch (error) {
            console.log(error)
          res.status(401).json({ message: 'not authorized, token failed' });
            
        }

    }else {
        console.log('no token provided')

        res.status(401).json({ message: 'not authorized, no token' });
    }
}

const Admin = async(req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).json({ message: 'not authorized as admin' });

    }
}

export { protect, Admin };