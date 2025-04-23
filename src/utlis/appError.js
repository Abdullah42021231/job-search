import { deleteFile } from "./file-funcation.js"
import { deleteCloudImage } from "./cloude.js"
export class AppError extends Error{
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
    }
}
//asyncHandler
export const asyncHandler = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            return next(new AppError(err.message, err.statusCode || 500))
        })
    }
}

//globaleErrorHandling
export const globaleErrorHandling =async (err , req , res , next)=>{
    //rollback file system
    if(req.file){
     deleteFile(req.file.path)
    }
    // rollback cloud image
    if(req.failImage){
       await deleteCloudImage(req.failImage.public_Id)
    }
    if(req.failImage?.lengt>0){
        for(const public_id of req.failImage){
            await deleteCloudImage(public_id)
        }
            
        }
     return res.status(err.statusCode || 500 ).json({
        message : err.message,
        success : false
     })
}