import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.URL_PORT;


export const mongoDBURL = process.env.mongoDBURL;