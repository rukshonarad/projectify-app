import { prisma } from "../prisma/index.js";

class UserService {
    signUp = async (input) => {
        try {
            await prisma.user.create({ data: input });
        } catch (error) {
            return error;
        }
    };
}

export const userService = new UserService();
