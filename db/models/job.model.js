import { model, Schema } from "mongoose";
import { level } from "../../src/utlis/contacts/enum.js";

//schema 
 const jobSchema = new Schema({
    name : {
        type :String,
        required : true,
    },
    location :{
        type : String,
        required : true
    },
    workingTime : {
        type : String,
        required : true
    },
    level :{
        type : String,
        enum : Object.values(level),
       
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    Tskills :{
        type : [String],
        required : true
    },
    S_skills :{
        type : [String],
        required : true
    },
    addBy :{
        type : Schema.Types.ObjectId,
        ref : "User",
        requires :true
    },
    company :{
        type : Schema.Types.ObjectId,
        ref : "Company",
        required : true
    }

},{timestamps : true})
//model
export const Job = model('Job', jobSchema)