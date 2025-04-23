import { Router } from "express";
import { isValid } from "../../meddileware/validation.js";
import { asyncHandler } from "../../utlis/appError.js";
import { addCompanyVal, searchCompanyVal, updateCompanyVal } from "./company.validation.js";
import { addCompany, deleteCompany, getCompany, searchCompany, updateCompany } from "./company.controller.js";
import { isAuthentication } from "../../meddileware/authentication.js";
import { isAuthorization } from "../../meddileware/authorization.js";
import { roles } from "../../utlis/contacts/enum.js";

const companyRouter = Router()
 
//add company
companyRouter.post('/' ,
    isAuthentication(),
    isAuthorization([roles.COMPANY_HR]),
    isValid(addCompanyVal),
    asyncHandler(addCompany)
)
//update company
companyRouter.put('/:companyId',
    isAuthentication(),
    isAuthorization([roles.COMPANY_HR]),
    isValid(updateCompanyVal),
    asyncHandler(updateCompany)

)

//get company todo returns all jobs
companyRouter.get('/:companyId' , 
    isAuthentication(),
    isAuthorization([roles.COMPANY_HR]),
    asyncHandler(getCompany)

)

//Search for a company with a name
companyRouter.get('/',
    isAuthentication(),
    isAuthorization([roles.COMPANY_HR , roles.USER]),
    isValid(searchCompanyVal),
    asyncHandler(searchCompany)
)
//delete company
companyRouter.delete('/:companyId' ,
    isAuthentication(),
    isAuthorization([roles.COMPANY_HR]),
    asyncHandler(deleteCompany)
)
export default companyRouter