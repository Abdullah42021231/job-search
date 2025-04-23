import bcrypt from 'bcrypt';
import { User } from "../../../db/models/user.model.js"
import { AppError } from "../../utlis/appError.js"
import { messages } from "../../utlis/contacts/messages.js"
import { generateToken, verifyToken } from '../../utlis/token.js';
import { sendEmail } from '../../utlis/email.js';


//sign up 
export const signup = async (req,res,next)=>{
    //get data from req
    let {firstName , lastName , userName , email , phone , password , recoveryemail , DOB} = req.body
    //check data exsistence 
    const userExist = await User.findOne({$or :[{email} , {phone}]}) // {} , null
    if(userExist){
        return next(new AppError(messages.user.aleardyExiste , 409))
    }
    //prepare data
    //hach password
    password = bcrypt.hashSync(password , 8)
    //prepare user
    const user = new User({
        firstName,
        lastName,
        userName,
        email,
        phone,
        password,
        recoveryemail,
        DOB
    })
    const createUser  = await user.save()
    if(!createUser ){
        return next(new AppError(messages.user.faileToCreate , 500))
    }
    //generate token
    const token = generateToken({payload:{email}})
    //send email
    await sendEmail({
        to : email,
        subject :  "verify your account",
        html : `<p>click  on link to verify account <a href ="${req.protocol}://${req.headers.host}/auth/verify/${token}">link</a></p>`
    })
    //send response 
    return res.status(200).json({
        message : messages.user.createSuccessfully,
        success : true,
        data : createUser 
    })
}

export const verifyAcount = async(req,res,next)=>{
    const {token} = req.params
    const payload = verifyToken({token})
    await User.findOneAndUpdate({email : payload.email , status : 'online'} , {status : 'offline'})
    return res.status(200).json({
        message:messages.user.verified
    })
}

//login
export const login =async (req,res,next)=>{
    //get data from req 
    let {email , phone , password} = req.body
    //check existence 
    const userExist = await User.findOne({$or :[{email} , {phone}] })
    if(!userExist){
        return next(new AppError(messages.user.notfound , 405))
    }
    //check password
    const match = bcrypt.compareSync(password , userExist.password)
    if(!match){
        return next(new AppError(messages.user.wrongPassword , 400))
    }
    //generet token 
    const token = generateToken({ payload: { _id: userExist._id, email: userExist.email } })
    // userExist.status = status.ONLINE;
    await userExist.save();
   
    console.log("Generated Token: ", token);

    //send respons 
    res.status(200).json({
        message : "login successfuyly",
        success : true,
        token  
        
    })
}

// update account
export const updateAccount = async (req, res, next) => {
    // get data from req
    let { email, phone, firstName, lastName, DOB, recoveryemail , userName } = req.body;
    const { accountId } = req.params; 
    // check existence
    const user = verifyToken(req.headers.authorization); 
    if (!user) {
        return next(new AppError(messages.user.notLoggedIn, 401)); 
    }

    if (req.authUser._id.toString() !== accountId ) {
        return next(new AppError(messages.user.unauthorized, 403));   
    }

    const accountExist = await User.findById(accountId);
    if (!accountExist) {
        return next(new AppError(messages.user.notfound, 404));
    }

    if (email) {
        const emailExist = await User.findOne({ email, _id: { $ne: accountId } });
        if (emailExist) {
            return next(new AppError(messages.user.aleardyExiste, 409)); 
        }
    }

    if (phone) {
        const phoneExist = await User.findOne({ phone, _id: { $ne: accountId } });
        if (phoneExist) {
            return next(new AppError(messages.user.phoneAlreadyExists, 409)); 
        }
    }

    if (email) accountExist.email = email;
    if (phone) accountExist.phone = phone;
    if (firstName) accountExist.firstName = firstName;
    if (lastName) accountExist.lastName = lastName;
    if (DOB) accountExist.DOB = DOB;
    if (recoveryemail) accountExist.recoveryemail = recoveryemail;
    if(userName) accountExist.userName = userName;


    const updatedAccount = await accountExist.save();
    if (!updatedAccount) {
        return next(new AppError(messages.user.faileToUpdate, 500)); 
    }

    return res.status(200).json({
        message: messages.user.updateSuccessfully,
        success: true,
        data: updatedAccount
    });
};

//get account 
export const getAccount = async (req,res,next)=>{
    const {accountId} = req.params
    const user = await User.findById(accountId)
    return res.status(200).json({
        success : true , 
        data : user
    })
}

//delete account
export const deleteAccount = async (req,res,next)=>{
    const {accountId} = req.params
    const user = await User.findById(accountId)
    if(!user){
        return next(new AppError(messages.user.notfound ,404))
    }
    const deletedAccount = await User.findByIdAndDelete(accountId)
    if(!deletedAccount){
        return next(new AppError(messages.user.faileToDelete ,500))
    }
    res.status(200).json({
        message : messages.user.deleteSuccessfully,
        success :true
    })

}

//update password
export const updatedPassword = async (req,res,next)=>{
    let { oldPassword, newPassword } = req.body;
    const accountId = req.authUser._id;

    const user = await User.findById(accountId);
    if (!user) {
        return next(new AppError(messages.user.notfound, 404));
    }

    const match = bcrypt.compareSync(oldPassword, user.password);
    if (!match) {
        return next(new AppError(messages.user.wrongPassword, 400));
    }

    user.password = bcrypt.hashSync(newPassword, 8);
    await user.save();

    return res.status(200).json({
        message: messages.user.passwordUpdated,
        success: true
    });
}

//forgot password
export const forgetPassword = async (req, res, next) => {
    const { recoveryemail } = req.body;
    const user = await User.findOne({ recoveryemail });
    if (!user) {
        return next(new AppError(messages.user.notfound, 404));
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
    user.otp = otp; 
    await user.save();

    await sendEmail({
        to: recoveryemail,
        subject: "Reset your password",
        html: `<p>Your OTP is: ${otp}</p>`
    });

    return res.status(200).json({
        message: messages.user.otpSent,
        success: true
    });
}

//get all users
export const getAccountsByRecoveryEmail = async (req, res, next) => {
    const { recoveryemail } = req.params;

    const accounts = await User.find({ recoveryemail });
    if (!accounts || accounts.length === 0) {
        return next(new AppError(messages.user.notfound, 404));
    }

    return res.status(200).json({
        message: messages.user.foundAccounts,
        success: true,
        data: accounts
    });


}