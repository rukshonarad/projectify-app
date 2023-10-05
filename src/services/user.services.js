import { prisma } from "../prisma/index.js";

class UserService {
    signUp = async (input) => {
        try {
            await prisma.user.create({
                data: input
            });
        } catch (error) {
            throw new Error(error);
        }
    };
    login = async (input) => {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: input.email
                }
            });
            if (user) {
                if (user.password !== input.password) {
                    throw new Error("Invalid Cridential");
                } else {
                    throw new Error("Invalid Cridential");
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const userService = new UserService();
