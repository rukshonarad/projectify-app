import jwt from "jsonwebtoken";
import { CustomError } from "../utils/custom-error.js";
class AuthMiddleware {
    authenticate = (req, res, next) => {
        const { headers } = req;
        if (!headers.authorization) {
            throw new CustomError("You are not logged in. Please, log in", 401);
        }
        const [prefix, token] = headers.authorization.split(" ");

        if (!prefix || !token) {
            throw new CustomError("Not Valid Token", 400);
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            if (payload.adminId) {
                req.adminId = payload.adminId;
            }
            if (payload.teamMember) {
                req.teamMember = teamMember.payload.teamMember;
            }
            next();
        } catch (error) {
            throw new CustomError(error.massage, 500);
        }
    };
    isAdmin = (req, __, next) => {
        const { adminId } = req;
        if (!adminId) {
            throw new CustomError(
                "Forbidden,You are not authorithed to preform this action",
                403
            );
        }
        next();
    };
}

export const authMiddleware = new AuthMiddleware();
