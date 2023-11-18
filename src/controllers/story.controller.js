import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";

class StoryController {
    create = catchAsync(async (req, res) => {
        const {
            body: { title, description, point, due, assigneeId, projectId }
        } = req;
        if (
            !title ||
            !description ||
            !point ||
            !due ||
            !assigneeId ||
            !projectId
        ) {
            throw new CustomError("All fiels are required", 400);
        }
        const story = await storyService.create(assigneeId, body);
        res.status(201).json({ data: story });
    });
}
export const storyController = new StoryController();
