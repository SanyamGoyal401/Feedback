import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    link: {
        type:String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
        category: [],
    },
    upvotes:{
        type: Number,
        default: 0,
    },
    comments:{
        type: [String],
        default: [],
    }

}, {
    timestamps: true
});



const Product = mongoose.model('Product', productSchema);
 
export {Product};