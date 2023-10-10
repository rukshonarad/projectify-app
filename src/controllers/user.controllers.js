import { userService } from "../services/user.services.js";

class UserController {
    signUp = async (req, res) => {
        const { body } = req;

        const input = {
            email: body.email,
            preferredFirstName: body.preferredName,
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

            res.status(200).json({
                message: "Success"
            });
        } catch (error) {
            let statusCode = 500;
            if (error.message === "Invalid Credentials") {
                statusCode = 401;
            }
            res.status(statusCode).json({
                error: error.message
            });
        }
    };

    activate = async (req, res) => {
        const {
            query: { activationToken }
        } = req;

        if (!activationToken) {
            res.status(400).json({
                message: "Activation Token is missing"
            });

            return;
        }

        try {
            await userService.activate(activationToken);

            res.status(200).json({
                message: "Success"
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    };

    forgotPassword = async (req, res) => {
        const {
            body: { email }
        } = req;

        try {
            await userService.forgotPassword(email);
            res.status(200).json({
                message: "Password reset email has been sent"
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };

    resetPassword = async (req, res) => {
        const {
            body: { password, passwordConfirm },
            headers
        } = req;
        if (!password || !passwordConfirm) {
            res.status(400).json({
                message: "Password and Password Confirm is required"
            });
            return;
        }

        if (password !== passwordConfirm) {
            res.status(400).json({
                message: "Password and Password Confirm does not match"
            });
            return;
        }
        if (!headers.authorization) {
            res.status(400).json({
                message: "Reset Token is missing"
            });
        }
        const [bearer, token] = headers.authorization.split(" ");
        if (bearer !== "Bearer" || !token) {
            res.status(400).json({
                message: "Invalid Token"
            });
        }

        try {
            await userService.resetPassword(token, password);
            res.status(200).json({
                message: "Password successfully updated"
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error.message
            });
        }
    };
}

export const userController = new UserController();
