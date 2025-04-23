import e from "express"
import { Company } from "../../../db/models/company.model.js"
import { AppError } from "../../utlis/appError.js"
import { messages } from "../../utlis/contacts/messages.js"
import { verifyToken } from "../../utlis/token.js"

//add company 
export const addCompany = async (req,res,next)=>{
    // get data from req
    let {name , email , address , numberOfEmployees ,description ,industry , companyHr} = req.body
    name = name.toLowerCase()
    //check existence
    const companyExist = await Company.findOne({$or :[{name} , {email}]}) // {} , null
    if(companyExist){
        return next(new AppError(messages.company.aleardyExiste , 409))
    }  
    //prepare data
    const company = new Company({
        name,
        email,
        address,
        industry,
        description,
        numberOfEmployees,
        companyHr,
    })
    const createCompany = await company.save()
    if(!createCompany){
        return next(new AppError(messages.company.faileToCreate , 500))
    }
    //send respons
    res.status(200).json({
        message : messages.company.createSuccessfully,
        success : true , 
        data : createCompany,
    })
}

//update company
export const updateCompany = async (req,res,next)=>{
    //get data from req
    let {name , email , description ,industry , address ,numberOfEmployees  } = req.body
    const {companyId} = req.params
    //check existence
    const companyExist = await Company.findById(companyId)
    if(!companyExist){
        return next(new AppError(messages.company.notfound ,404))
    }
    //validate owner
    if(!companyExist.companyHr.equals(req.authUser._id)){
        return next(new AppError(messages.company.unauthorized,403))
    }

   const updatedCompany =await Company.findByIdAndUpdate({_id:companyId} , {
    name,
    email,
    description,
    industry,
    address,
    numberOfEmployees,
   } , {new :true})
   if(!updatedCompany){
    return next(new AppError(messages.company.faileToUpdate, 500))
   }
   
    return res.status(200).json({
        message: messages.company.updateSuccessfully,
        success: true,
        data: updatedCompany
    });
}

//get company data
export const getCompany = async(req,res,next)=>{
    const {companyId} = req.params
    const company = await Company.findById(companyId)
    if(!company){
        return next(new AppError(messages.company.notfound, 404))
    }
    return res.status(200).json({
        success : true , 
        data : company
    })
}

//Search for a company with a name 
export const searchCompany = async(req,res,next)=>{
    const {name} = req.query
    const company = await Company.find({name :{$regex :name , $options :'i'}})
    if(!company  || company.length === 0){
        return next(new AppError(messages.company.notfound,404))
    }
    return res.status(200).json({
        success : true , 
        data : company
    })
}

//delete company
export const deleteCompany = async (req,res,next)=>{
    //get data from req
    const {companyId} = req.params
    const company = await Company.findById(companyId)
    if(!company){
        return next(new AppError(messages.company.notfound, 404))
    }
    const deletedCompany = await Company.findByIdAndDelete(companyId)
    if(!deletedCompany){
        return next(new AppError(messages.company.faileToDelete, 500))
    }
    return res.status(200).json({
        message: messages.company.deleteSuccessfully,
        success: true,
    });
} 

//Get all applications for specific Job todo 
