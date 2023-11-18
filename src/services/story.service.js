import { prisma } from "../prisma/index.js";

class StoryService {
    create = async (input, assigneeId) => {
        const story = await prisma.story.create({
            data: { ...input, assigneeId }
        });
        return story;
    };
}
export const storyService = new StoryService();
