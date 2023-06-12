import asyncHandler from 'express-async-handler';
import {User} from '../models/userModel.js';
import { generateToken } from '../utils/generateTokens.js';

//@desc    Auth User/set token
//route    Post /api/users/auth
//@access  Public
const authUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    
    const user = await User.findOne({email});
    
    if(user && (await user.matchPassword(password))){
        let token = generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }   
});

//@desc    Register User/set token
//route    Post /api/users/register
//@access  Public
const registerUser = asyncHandler(async (req, res)=>{
    const {name, email, mobile, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        mobile,
        password
    })

    if(user){
        let token = generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        })
        // console.log(User);
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
    
});

//@desc    Logout User/set token
//route    Post /api/users/logout
//@access  Public
const logoutUser = asyncHandler(async (req, res)=>{
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0)
    } )
    res.status(200).json({message: "User Logged Out"});
});

export{
    authUser,
    registerUser,
    logoutUser
}