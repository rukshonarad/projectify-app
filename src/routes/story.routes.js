import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { storyController } from "../controllers/story.controller.js";
const storyRouter = new Router();

storyRouter.post(
    "/",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    storyController.create
);
storyRouter.get(
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.verifyReadUpdateDeleteStoryPermissions,
    storyController.getOne
);
export { storyRouter };
