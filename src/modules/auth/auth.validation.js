import joi from 'joi';
import { generalFields } from '../../meddileware/validation.js';

export const signupVal = joi.object({
    firstName : generalFields.firstName.required(),
    lastName: generalFields.lastName.required(),
    userName : generalFields.userName.required(),
    email : generalFields.email.required(),
    recoveryemail :generalFields.recoveryemail,
    password : generalFields.password.required(),
    cPassword : generalFields.cPassword.required(),
    DOB : generalFields.DOB,
    phone :generalFields.phone.required()

})

export const loginVal = joi.object({
    phone : generalFields.phone.when('email' , {
        is : joi.exist(),
        then : joi.optional(),
        otherwise:joi.required()

    }),
    email : generalFields.email,
    password : generalFields.password.required()
})

export const updateVal = joi.object({
    email : generalFields.email,
    accountId : generalFields.objectId,
    phone : generalFields.phone,
    recoveryemail : generalFields.recoveryemail,
    DOB : generalFields.DOB,
    firstName : generalFields.firstName,
    lastName : generalFields.lastName,
    userName : generalFields.userName,

})

export const updatePassword = joi.object({
    accountId : generalFields.objectId,
    oldPassword : generalFields.oldPassword,
    newPassword : generalFields.newPassword
})

export const forgotVal = joi.object({
    accountId : generalFields.objectId,
    recoveryemail : generalFields.recoveryemail,
})

