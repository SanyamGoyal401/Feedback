
//Imports
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';

//get directory name 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.resolve(__dirname, '.env')});


import {connectDB} from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';


//connect to DATABASE
connectDB();


const app = express();
//allow all origin to access
app.use(cors({
    origin: '*'
}));

//allow to read request body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

//set port
const port = process.env.PORT || 5000;

//import routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cookieParser from 'cookie-parser';

//use routes 
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

//health routes
app.get("/health", (req, res)=>{
    res.send('Server is Healthy');
})

app.get("/", (req, res)=>{
    res.send("SERVER IS LIVE");
})

//Use error middlewares
app.use(notFound);
app.use(errorHandler);

//listen to port
app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
})