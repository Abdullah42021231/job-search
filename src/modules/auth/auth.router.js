import { Router } from "express";
import { isValid } from "../../meddileware/validation.js";
import { forgotVal, loginVal, signupVal, updatePassword, updateVal } from "./auth.validation.js";
import { asyncHandler } from "../../utlis/appError.js";
import { deleteAccount, forgetPassword, getAccount, getAccountsByRecoveryEmail, login, signup, updateAccount, updatedPassword, verifyAcount } from "./auth.controller.js";
import { isAuthentication } from "../../meddileware/authentication.js";
import { isAuthorization } from "../../meddileware/authorization.js";
import { roles } from "../../utlis/contacts/enum.js";

 const authRouter = Router()
//sign up
authRouter.post('/signup' , 
    isValid(signupVal),
    asyncHandler(signup)
)
authRouter.get('/verify/:token',
    asyncHandler(verifyAcount)
)

//login 
authRouter.post('/login',
    isValid(loginVal),
    asyncHandler(login)
)
 // update account 
authRouter.put('/account/:accountId',
    isAuthentication(),
    isAuthorization([roles.USER ]),
    isValid(updateVal),
    asyncHandler(updateAccount)
)

//get account 
authRouter.get('/:accountId' , 
    asyncHandler(getAccount)
)

//delete account 
authRouter.delete('/:accountId' ,
    asyncHandler(deleteAccount)
)

//update password
authRouter.put('/:accountId',
    isAuthentication(),
    isAuthorization([roles.USER]),
    isValid(updatePassword),
    asyncHandler(updatedPassword)
)

//forgot password
authRouter.put('/forgetpassword/:accountId' , 
    isAuthentication(),
    isAuthorization([roles.USER]),
    isValid(forgotVal),
    asyncHandler(forgetPassword)
)

//get all account 
authRouter.get('/' , 
    asyncHandler(getAccountsByRecoveryEmail)
)
export default authRouter