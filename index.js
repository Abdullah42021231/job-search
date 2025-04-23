//import module
import express from 'express';
import dotenv from 'dotenv'
import { ConnectDB } from './db/connection.js';
import path from 'path';
import authRouter from './src/modules/auth/auth.router.js';
import { globaleErrorHandling } from './src/utlis/appError.js';
import companyRouter from './src/modules/company/company.router.js';
import jobRouter from './src/modules/job/job.router.js';
//create server
const app = express()
const port = 5000
dotenv.config({path : path.resolve('./config/.env')})
//connect to db
ConnectDB()
//parse 
app.use(express.json())
app.use('/auth' , authRouter)
app.use('/company' , companyRouter)
app.use('/job' , jobRouter)
 // global handeling
app.use(globaleErrorHandling)
 //listen on port
 app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
 })