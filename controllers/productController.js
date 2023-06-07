import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel.js';
import mongoose from 'mongoose';



//@desc    All Product
//route    Get /api/products/
//@access  Private
const allProduct = asyncHandler(async (req, res)=>{
    const allProducts = await Product.find({});
    if(allProducts){
        res.status(200).json({
            allProducts
        });
    }
    else{
        res.status(500).json({
            message: "no data exists"
        })
    }
});


//@desc    Add Product
//route    Post /api/products/add
//@access  Private
const addProduct = asyncHandler(async (req, res)=>{
    const {name, desc, logo, link, category} = req.body;
    
    const product = await Product.create({
        name,
        desc,
        logo,
        link,
        category,
    })

    if(product){
        res.status(201).json({
            message: "Product added successfully"
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
    
});

//@desc    Edit Product
//route    Put /api/products/edit
//@access  Private
const editProduct = asyncHandler(async (req, res)=>{
    const {_id, name, desc, logo, link, category } = req.body;
    
    const product = await Product.findById(_id).exec();
    if(product){

        product.name = name || product.name;
        product.desc = desc || product.desc;
        product.logo = logo || product.logo;
        product.link = link || product.link;
        product.category = category || product.category;
        const updatedProduct = await product.save();
        res.status(201).json({
            message: "Product Updated successfully"
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
    
});

//@desc    upvote Product
//route    Put /api/products/upvote
//@access  Public
const upvote = asyncHandler(async (req, res)=>{
    const {_id} = req.body;
    
    const product = await Product.findById(_id).exec();
    if(product){
        product.upvotes = product.upvotes + 1;
        
        const updatedProduct = await product.save();
        
        res.status(201).json({
            message: "Product Upvoted successfully"
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
    
});


//@desc    downvote Product
//route    Put /api/products/downvote
//@access  Public
const downvote = asyncHandler(async (req, res)=>{
    const {_id} = req.body;
    
    const product = await Product.findById(_id).exec();
    if(product){
        product.upvotes = product.upvotes == 0 ? 0 : product.upvotes - 1;
        
        const updatedProduct = await product.save();

        res.status(201).json({
            message: "Product Downvoted successfully"
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
    
});

//@desc    comment Product
//route    Put /api/products/comment
//@access  Public
const comment = asyncHandler(async (req, res)=>{
    const {_id, comment} = req.body;
    
    const product = await Product.findById(_id).exec();
    if(product){
        product.comments = [...product.comments, comment];
        
        const updatedProduct = await product.save();

        res.status(201).json({
            message: "comment added successfully"
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
    
});


export{
    allProduct,
    addProduct,
    editProduct,
    upvote,
    downvote,
    comment
};