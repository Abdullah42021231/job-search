import { User } from "../../db/models/user.model.js";
import { AppError } from "../utlis/appError.js";
import { messages } from "../utlis/contacts/messages.js";
import { verifyToken } from "../utlis/token.js";

export const isAuthentication = () => {
    return async (req, res, next) => {
        
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return next(new AppError('Token is missing or malformed', 401));
        }

        const token = authHeader.split(' ')[1];

        
        const payload = verifyToken({ token });
        if (payload.message) {
            return next(new AppError(payload.message, 401));
        }

        
        const authUser = await User.findOne({ _id: payload._id, status: { $ne: 'verified' } });
        if (!authUser) {
            return next(new AppError(messages.user.notfound, 404));
        }

    
        req.authUser = authUser;
        next();
    };
};
