import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const storyRouter = new Router();

storyRouter.post(
    "/",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    storyContrller.create
);
export { storyRouter };
