import { Router } from "express";
import { userController } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.patch("/:id", userController.update);
export { userRouter };
