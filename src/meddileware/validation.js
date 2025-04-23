//import module
import joi from 'joi';
import { AppError } from '../utlis/appError.js';

export const generalFields = {
    name : joi.string().required(),
    description : joi.string().min(10).max(100).optional(),
    industry : joi.string().min(10).max(100).optional(),
    address : joi.string(), 
    numberOfEmployees : joi.number().integer().min(1).optional(),
    firstName:joi.string(),
    lastName :joi.string(),
    userName: joi.string().custom((value,helpers)=>{const {firstName  , lastName} =helpers.state.ancestors[0]; if(!firstName  || !lastName){return helpers.error('any.invalid' ,{ message: error.message} )} return `${firstName }.${lastName}`.toLowerCase()}),
    DOB : joi.string().pattern(/^\d{4}-\d{2}-\d{1,2}$/).required().messages({ 'string.pattern.base': 'Date of birth must be in the format YYYY-MM-DD', 'any.required': 'Date of birth is required'}),
    description : joi.string().max(2000),
    objectId :  joi.string().length(24).hex().required(),
    email : joi.string().email(),
    recoveryemail : joi.string().email(),
    phone : joi.string().pattern(new RegExp(/^01[0-2,5]{1}[0-9]{8}$/)),
    password : joi.string().pattern(new RegExp(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/)),
    cPassword : joi.string().valid(joi.ref('password')),
    oldPassword: joi.string().when(joi.object({ action: joi.valid('updatePassword') }).unknown(), { then: joi.required() }),
    newPassword: joi.string().when(joi.object({ action: joi.valid('updatePassword') }).unknown(), { then: joi.required() }),
    location :   joi.string().required().min(3).messages({'string.empty': 'Location cannot be empty','string.min': 'Location must be at least 3 characters','any.required': 'Location is required' }),
    workingTime: joi.string().valid('part-time', 'full-time').required().messages({'any.only': 'Working time must be either part-time or full-time','string.empty': 'Working time cannot be empty', 'any.required': 'Working time is required'}),
    level: joi.string().valid('junior', 'mid_level', 'senior',  'cot').required().messages({'any.only': 'Level must be one of: junior, mid_level, senior, cot','string.empty': 'Level cannot be empty','any.required': 'Level is required' }),
    Tskills :  joi.array().items(joi.string()).required().messages({'array.base': 'Technical skills must be an array of strings','string.base': 'Each skill must be a string', 'array.empty': 'Technical skills cannot be empty','any.required': 'Technical skills are required' }),
    S_skills :joi.array().items(joi.string()).required().messages({'array.base': 'Soft skills must be an array of strings','string.base': 'Each skill must be a string','array.empty': 'Soft skills cannot be empty','any.required': 'Soft skills are required'}),
}

export const isValid = (schema)=>{
    return (req,res,next)=>{
        let data = {...req.body,...req.params,...req.query}
        const {error}=schema.validate(data , {abortEarly:false});
        if(error){
            const errArr = [];
            error.details.forEach((err) => {errArr.push(err.message)});
            return next(new AppError(errArr,400));
        }
        next()
    }
}
