
import { model, Schema } from "mongoose";

//scheam
 const applicationSchema = new Schema({
    jobId:{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userTSkills:{
       type : [String],
       required:true
    },
    userS_skills :{
        type : [String],
        required:true
    },
    userResume :{
        type: String,
        required:true
    }
},{timestamps:true})
//model
export const Application = model('Application',applicationSchema)