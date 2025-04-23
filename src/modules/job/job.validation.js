import joi from 'joi';
import { generalFields } from '../../meddileware/validation.js';

export const addJobVal = joi.object({
    name : generalFields.name,
    location : generalFields.location,
    workingTime : generalFields.workingTime,
    level : generalFields.level,
    Tskills : generalFields.Tskills,
    S_skills : generalFields.S_skills,
    company  : generalFields.objectId,
    description : generalFields.description
})

export const updateJobVal = joi.object({
    name : generalFields.name,
    location : generalFields.location,
    workingTime : generalFields.workingTime,
    level : generalFields.level,
    Tskills : generalFields.Tskills,
    S_skills : generalFields.S_skills,
    description : generalFields.description,
    jobId : generalFields.objectId

})

export const getjobVal = joi.object({
    name : generalFields.name
})

// export const applyJobVal = joi.object({
//     jobId : generalFields.objectId,
//     userTSkills :joi.array().items(joi.string()).required() , 
//     userS_skills :   joi.array().items(joi.string()).required()  

// })