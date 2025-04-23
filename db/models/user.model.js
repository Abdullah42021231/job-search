import { model, Schema } from "mongoose";
import { roles } from "../../src/utlis/contacts/enum.js";
//schema
 const userSchema = new Schema({
    firstName  :{
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },
    userName : {
        type : String,
        required : true ,
        lowercase : true,
        trim : true,
    },
    email : {
        type : String,
        required : true ,
        unique : true,
        lowercase : true,
        trim : true
    },
    password:{
        type :String , 
        required: true
    },
    recoveryemail : {
        type : String,
        lowercase : true,
        trim : true
    },
    DOB :{
        type : String,
        required : true,
        
    },
    phone :{
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    role :{
        type : String,
        enum : Object.values(roles),
        default : roles.USER
    },
    status : {
        type : String,
        enum : ["online","offline"],
        default :"online"
    }

},{timestamps : true})
//model
export const User = model('User' , userSchema)