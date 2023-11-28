import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { storyController } from "../controllers/story.controller.js";
const storyRouter = new Router();

storyRouter.post(
    "/",
    authMiddleware.authenticate,
    authMiddleware.verifyCreateStoryPermissions,
    storyController.create
);

storyRouter.get(
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.verifyReadUpdateDeleteStoryPermissions,
    storyController.getOne
);
storyRouter.get(
    "/projectStories/:projectId",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    storyController.getAll
);
storyRouter.patch(
    "/:id",
    authMiddleware.authenticate,
    authMiddleware.verifyReadUpdateDeleteStoryPermissions,
    storyController.update
);
storyRouter.patch(
    "/:id/changeStatus",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    storyController.changeStatus
);
export { storyRouter };
