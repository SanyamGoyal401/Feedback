import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
} from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/', registerUser);
userRoutes.post('/auth', authUser);
userRoutes.post('/logout', logoutUser);

export default userRoutes;