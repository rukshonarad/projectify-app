import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";
import { storyService } from "../services/story.service.js";
class StoryController {
    create = catchAsync(async (req, res) => {
        const {
            body: { title, description, point, due, assigneeId, projectId },
            adminId
        } = req;
        if (!title || !projectId) {
            throw new CustomError("All fiels are required", 400);
        }
        const input = {
            title,
            description,
            point,
            due,
            assigneeId,
            projectId
        };
        const story = await storyService.create(input, adminId);
        res.status(201).json({ data: story });
    });
}
export const storyController = new StoryController();
