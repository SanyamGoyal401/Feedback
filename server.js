import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.resolve(__dirname, '../.env')});


import {connectDB} from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
