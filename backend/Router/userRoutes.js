import express from 'express'
import userModel from '../Model/UserSchema.js';
import { protect, Admin } from '../Middlewares/authMiddleware.js';

const router = express.Router();
import {  AuthUser,
    RegisterUser,
    LogoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    DeleteUsers,
    DeleteUserById,
    UpdateUser } from '../Controllers/userController.js';

router.route('/').post(RegisterUser).get(protect, Admin, getUsers);
router.post('/login', AuthUser)
router.post('/logout', LogoutUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/:id').delete(protect, Admin, DeleteUsers).get(protect, Admin, getUserById).put(UpdateUser);


export default router