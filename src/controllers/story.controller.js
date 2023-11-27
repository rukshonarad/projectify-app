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
        res.status(200).json({ data: story });
    });
    getOne = catchAsync(async (req, res) => {
        const { story } = req;
        res.status(200).json({ data: story });
    });
    getAll = catchAsync(async (req, res) => {
        const { params, adminId } = req;

        const stories = await storyService.getAll(params.projectId, adminId);
        res.status(200).json({
            data: stories
        });
    });
    update = catchAsync(async (req, res) => {
        const { body, assigneeId, params } = req;
        const update = {};

        if (body.title) {
            update.title = body.title;
        }
        if (body.description) {
            update.description = body.description;
        }
        if (body.point) {
            update.point = body.point;
        }
        if (body.dueDate) {
            update.dueDate = body.dueDate;
        }
        if (
            !update.title &&
            !update.description &&
            !update.point &&
            !update.dueDate
        ) {
            throw new CustomError("No update data provided", 400);
        }

        await storyService.update(params.id, assigneeId, update);
        res.status(204).send();
    });
}
export const storyController = new StoryController();
