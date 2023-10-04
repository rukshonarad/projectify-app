import { Router } from "express";
import { userController } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp);

export { userRouter };
