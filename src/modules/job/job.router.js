import { Router } from "express";
import { CloudeUplode } from "../../utlis/multer.cloude.js"; 
import { isAuthentication } from "../../meddileware/authentication.js";
import { isAuthorization } from "../../meddileware/authorization.js";
import { isValid } from "../../meddileware/validation.js";
import { asyncHandler } from "../../utlis/appError.js";
import { roles } from "../../utlis/contacts/enum.js";
import { addJobVal,  getjobVal, updateJobVal } from "./job.validation.js";
import { addJob, applyJob, getAllJobs,  getAlljobsF,  updateJob } from "./job.controller.js";

const jobRouter = Router()
//add job
jobRouter.post('/',
    isAuthentication(),
    isAuthorization([roles.COMPANY_HR]),
    isValid(addJobVal),
    asyncHandler(addJob)
)

//update job
jobRouter.put('/:jobId',
    isAuthentication(),
    isAuthorization([roles.COMPANY_HR]),
    isValid(updateJobVal),
    asyncHandler(updateJob)
)

//Get all Jobs with their company’s information
jobRouter.get('/',
    isAuthentication(),
    isAuthorization([roles.COMPANY_HR]),
    asyncHandler(getAllJobs)

)

//Get all Jobs for a specific company.
jobRouter.get('/',
    isAuthentication(),
    isAuthorization([roles.COMPANY_HR]),
    isValid(getjobVal),
    asyncHandler()
)
//Get all Jobs that match the following filters 
jobRouter.get('/filter',
    isAuthentication(),
    isAuthorization(roles.COMPANY_HR),
    asyncHandler(getAlljobsF)
)
//Apply to Job
jobRouter.post('/apply',
    isAuthentication(),
    isAuthorization([roles.USER]),
    CloudeUplode({}).single('pdf'),
    // isValid(applyJobVal),
    asyncHandler(applyJob)
)

export default jobRouter