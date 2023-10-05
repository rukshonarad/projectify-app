import { userService } from "../services/user.services.js";

class UserController {
    signUp = async (req, res) => {
        const { body } = req;

        const input = {
            email: body.email,
            preferredFirstName: body.preferredFirstName,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password
        };

        try {
            await userService.signUp(input);
            res.status(201).json({
                message: "Success"
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };
    login = async (req, res) => {
        const { body } = req;
        const input = {
            email: body.email,
            password: body.password
        };
        try {
            await userService.login(input);
            res.status(200).json({ massage: "Success" });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };
}

export const userController = new UserController();
