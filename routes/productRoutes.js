import express from 'express';
import {
    allProduct,
    allCategory,
    addProduct,
    editProduct,
    upvote,
    downvote,
    comment,
}from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';

const productRoutes = express.Router();

productRoutes.get('/',allProduct);
productRoutes.get('/category', allCategory);
productRoutes.post('/add',protect, addProduct);
productRoutes.put('/edit', protect, editProduct);
productRoutes.put('/upvote', upvote);
productRoutes.put('/downvote', downvote);
productRoutes.put('/comment', comment);

export default productRoutes;