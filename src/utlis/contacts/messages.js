const generateMessage = (entity)=>({
    aleardyExiste : `${entity} already exists`,
    notfound : `${entity} not found`,
    faileToCreate : `faile to create ${entity}`,
    faileToUpdate : `faile to update ${entity}`,
    faileToDelete : `faile to delete ${entity}`,
    createSuccessfully : `${entity} created successfully`,
    updateSuccessfully: `${entity} updated successfully`,
    deleteSuccessfully: `${entity} deleted successfully`,
    notLoggedIn :`${entity} notLoggedIn`,
    unauthorized : `${entity} unauthorized`
   
})
export const messages = {
    user : {...generateMessage('user') , verified :"user verified successfully" , wrongPassword : "wrongPassword" , notAuthorized : " not authorized to access this api" , notLoggedIn : "notLoggedIn" , unauthorized : "unauthorized" , phoneAlreadyExists : "phoneAlreadyExists" , otpSent : "otpSent" , passwordUpdated : "passwordUpdated"},
    company : generateMessage('company'),
    job : generateMessage('job'),
}