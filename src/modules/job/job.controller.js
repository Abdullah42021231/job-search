import { Application } from "../../../db/models/application.js"
import { Company } from "../../../db/models/company.model.js"
import { Job } from "../../../db/models/job.model.js"
import { ApiFeature } from "../../utlis/apifature.js"
import { AppError } from "../../utlis/appError.js"
import cloudinary from "../../utlis/cloude.js"
import { messages } from "../../utlis/contacts/messages.js"

//add job 
export const addJob =async (req,res,next)=>{
    //get data from req
    const {name , location , Tskills ,S_skills,workingTime , level , description ,company } =req.body
    //check existence
    console.log(company);
    const jobes = await Company.findById(company )
    if(!jobes){
        return next(new AppError(messages.company.notfound,404))
    }
    //prepare data
    const job =new Job({
        name,
        location,
        Tskills,
        S_skills,
        description,
        workingTime,
        level,
        addBy : req.authUser._id,
        company 

    })
    const createJob = await job.save()
    if(!createJob){
        return next(new AppError(messages.job.faileToCreate,500))
    }
    //send respons
    res.status(200).json({
        message : messages.job.createSuccessfully,
        success : true,
        data : createJob
    })
}

//update company
export const updateJob = async(req,res,next)=>{
    //get data from req
    let {name , location , Tskills, S_skills, description, workingTime} = req.body
    const {jobId} = req.params
    //check existing
    const jobexist = await Job.findById(jobId)
    if(!jobexist){
        return next(new AppError(messages.job.notfound,404))
    }
    //validate owner
    if(!jobexist.addBy.equals(req.authUser._id)){
        return next(new AppError(messages.job.unauthorized , 403))
    }
    const updatedJob = await Job.findByIdAndUpdate({_id : jobId} , {
        name,
        location,
        Tskills,
        S_skills,
        description,
        workingTime
    } , {new :true})
    if(!updatedJob){
        return next(new AppError(messages.job.faileToCreate , 500))
    }
    //send respons
    return res.status(200).json({
        message : messages.job.updateSuccessfully,
        success : true,
        data : updatedJob
    })
   
}

//Get all Jobs with their company’s information

export const getAllJobs = async(req,res,next)=>{
    const job = await Job.find().populate('company')
    if(!job  || job.length === 0){
        return next(new AppError(messages.job.notfound,404))
    }
    return res.status(200).json({
        success : true , 
        data : job
    })
}

//Get all Jobs for a specific company
export const getAllJobis = async(req,res,next)=>{
    const {name} = req.query
    if(!name){
        return next(new AppError('Please provide a company name', 400));
    }
    const company = await Company.findOne({name:{ $regex : name , $options: 'i'}})
    if(!company){
        return next(new AppError(messages.company.notfound,404))
    }

    const job = await Job.find({company : company._id}).populate('company')
    if(!job  || job.length === 0){
        return next(new AppError(messages.job.notfound,404))
    }
    return res.status(200).json({
        success : true , 
        data : job
    })
}

//Get all Jobs that match the following filters 
export const getAlljobsF = async (req,res,next) =>{
    const apiFeature = new ApiFeature(Job.find(),req.query).filter()
    const prouducts = await apiFeature.mogooseQuery
    return res.status(200).json({success : true, data : prouducts})
}

//Apply to Job
export const applyJob = async(req,res,next)=>{
    const {jobId , userS_skills , userTSkills} = req.body
    const job = await Job.findById(jobId)
    if(!job){
        return next(new AppError(messages.job.notfound ,404))
    }
    
    //pdf
    const {secure_url , public_id} =  await cloudinary.uploader.upload(req.file.path , {
        folder : "job-applications/resumes",
    })
    const application = new Application({
        jobId,
        userId : req.authUser._id,
        userS_skills,
        userTSkills,
        userResume :{secure_url , public_id}
    })
    const newApplication = await application.save();
    if (!newApplication) {
        req.failImage = {secure_url , public_id}
        return next(new AppError('Failed to submit application', 500));
    }

    res.status(200).json({
        message: 'Application submitted successfully',
        success: true,
        data: newApplication,
    });
}


