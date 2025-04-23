//import module
import multer,{diskStorage} from "multer";
import { AppError } from "./appError.js";
const faileValidation = {
    image : ['image/jpeg','image/png'],
    file : ['application/pdf','application/msword'],
    video : ['video/mp4','video/webm'],
    audio : ['audio/mp3','audio/wav']
 }

export const CloudeUplode = ({ allowTypes = faileValidation.file} ={})=>{
   const storage =  diskStorage({})
const fileFilter =(req,file , cb)=>{
    if(!allowTypes.includes(file.mimetype)){
       cb(new AppError('invalid file formate',400),false)
       
    }
   cb(null, true)
}
   return multer({storage, fileFilter})
}