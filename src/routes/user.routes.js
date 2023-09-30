import { Router } from "express";
import { userController } from "../controller/user.controllers.js";

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp);

export { userRouter };
