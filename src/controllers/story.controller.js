import { catchAsync } from "../utils/catch-async.js";

class StoryController {
    create = catchAsync(async (req, res) => {
        const {
            body: { title, description, point }
        } = req;
    });
}
