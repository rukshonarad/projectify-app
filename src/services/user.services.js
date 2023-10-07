import { prisma } from "../prisma/index.js";
import { hasher } from "../utils/hash.js";

class UserService {
    signUp = async (input) => {
        try {
            const hashedPassword = await hasher.hash(input.password);
            await prisma.user.create({
                data: { ...input, password: hashedPassword }
            });
        } catch (error) {
            console.log(error);
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

            if (!user) throw new Error("Invalid Credentials");

            const isPasswordMatchs = hasher.compare(
                input.password,
                user.password
            );
            if (!isPasswordMatchs) {
                throw new Error("Invalid Credentials");
            }
        } catch (error) {
            throw error;
        }
    };
    update = async (input, id) => {
        try {
            await prisma.user.update({ where: { id }, data: input });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

export const userService = new UserService();
