import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from './routes/booksRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:5173', 'https://bookstorefrontend-henna.vercel.app'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome to the Admin Panel</h1>");
});

app.use('/books', booksRoute);

// Connect to MongoDB
mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
    
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => console.error("MongoDB connection error:", err));
