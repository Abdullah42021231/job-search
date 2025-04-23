
import { model, Schema } from "mongoose";

//schema
 const companyScema = new Schema({
    name :{
       type : String,
       required:true,
       unique : true,
       lowercase : true,
       trim : true 
    },
    description : {
        type : String,
        required : true , 
        trim : true
    },
    industry :{
        type : String,
        trim:true
    },
    address : {
        type : String,
        required : true
    },
    numberOfEmployees : {
        type : Number,
        required : true
    },
    email: {
        type : String,
        required : true ,
        unique : true,
        lowercase : true,
        trim : true
    },
    companyHr : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

},{timestamps : true})
//model
export const Company = model('Company', companyScema)