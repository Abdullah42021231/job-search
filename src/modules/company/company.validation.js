import joi from 'joi'
import { generalFields } from '../../meddileware/validation.js'


export const addCompanyVal = joi.object({
    name : generalFields.name,
    description : generalFields.description,
    industry : generalFields.industry,
    address : generalFields.address,
    numberOfEmployees : generalFields.numberOfEmployees,
    email :generalFields.email,
    companyHr : generalFields.objectId
})

export const updateCompanyVal = joi.object({
    name : generalFields.name,
    description : generalFields.description,
    industry:generalFields.industry,
    address : generalFields.address,
    numberOfEmployees: generalFields.numberOfEmployees,
    email:generalFields.email,
    companyId : generalFields.objectId, 
    
})

export const searchCompanyVal = joi.object({
    name : generalFields.name
})