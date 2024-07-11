import userModel from "../Model/UserSchema.js";
import jwt from 'jsonwebtoken'

const AuthUser = async(req, res) =>{
   
   try {
    const {email, password} = req.body;
    console.log(email,'email', password, 'password','initial login log');
    const user= await userModel.findOne({email})
     if(!user){
    res.status(401).json({ message: 'Please signup, u dont have an account yet!' });
        
     }
     else{
    //jwt consists of headers, Payload, signature.

    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, { expiresIn : '15d'})

    //set jwt as HTTPonly-cookie
    res.cookie('jwt' , token, {
        httpOnly : true,
        secure : process.env.NODE_ENV !== 'development',
        sameSite : 'strict',
        maxAge : 30 * 24 * 60 * 60 * 1000 //30 days
    })
}

    if(user && await(user.matchPassword(password))){
    res.json({
        id : user._id,
        name : user.name,
        email : user.email,
        isAdmin : user.isAdmin
    })
    
}
    
else {
    res.status(401).json({ message: 'Invalid email or password' });
}
} catch (error) {
res.status(500).json({ message: error.message });
}
      
}

const RegisterUser = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await userModel.create({
            email,
            name,
            password  // You'll hash this password before saving
        });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' });

        // Set JWT as HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        // Send user data to frontend
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const LogoutUser = async(req, res) =>{
    res.cookie('jwt', '', {
        httpOnly : true,
        expires : new Date(0)
    })
    res.status(200).json('User logged out successfully');
}

const getUserProfile = async(req,res) =>{
 
    const user = await userModel.findById(req.user._id);

    if(user){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });

    }else{
        res.status(404).json('User not Found');
    }
}

const updateUserProfile = async(req,res) => {
    const user = await userModel.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.status(200).json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }else{
        res.status(404).json('User not Found');

    }

}

const getUsers = async(req, res) => {
    res.send('send the user list');
}

const getUserById = async(req, res) => {
    res.send('The respected user');
}

const DeleteUsers = async(req, res) => {
    res.send('Users deleted');
}

const DeleteUserById = async(req,res) => {
    res.send('User deleted by Id');
}

const UpdateUser = async(req, res) => {
    res.send('The User is updated');
}

export {
    AuthUser,
    RegisterUser,
    LogoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    DeleteUsers,
    DeleteUserById,
    UpdateUser
}