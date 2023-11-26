import jwt from "jsonwebtoken";
import { CustomError } from "../utils/custom-error.js";
import { catchAsync } from "../utils/catch-async.js";
import { prisma } from "../prisma/index.js";
import { storyService } from "../services/story.service.js";

class AuthMiddleware {
    authenticate = (req, res, next) => {
        const { headers } = req;
        if (!headers.authorization) {
            throw new CustomError("You are not logged in. Please, log in", 401);
        }
        const [prefix, token] = headers.authorization.split(" ");

        if (!prefix || !token) {
            throw new CustomError("Not Valid Token", 400);
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            if (payload.adminId) {
                req.adminId = payload.adminId;
            }
            if (payload.teamMember) {
                req.teamMember = teamMember.payload.teamMember;
            }
            next();
        } catch (error) {
            throw new CustomError(error.massage, 500);
        }
    };
    isAdmin = (req, __, next) => {
        const { adminId } = req;
        if (!adminId) {
            throw new CustomError("Only Admin can preform this action", 403);
        }
        next();
    };
    verifyReadUpdateDeleteStoryPermissions = catchAsync(
        async (req, _, next) => {
            const {
                adminId,
                teamMember,
                params: { id }
            } = req;

            const story = await storyService.getOne(id);
            const { projectId } = story;

            const project = await prisma.project.findUnique({
                where: {
                    id: projectId
                }
            });

            if (adminId) {
                if (project.adminId !== adminId) {
                    throw new CustomError(
                        "Forbidden: You are not authorized to perform this action",
                        403
                    );
                }
                req.story = story;
                next();
            }

            if (teamMember) {
                const teamMemberProject =
                    await prisma.teamMemberProject.findFirst({
                        where: {
                            teamMemberId: teamMember.id,
                            projectId: projectId
                        }
                    });

                if (
                    !teamMemberProject ||
                    (teamMemberProject &&
                        teamMemberProject.status === "INACTIVE") ||
                    project.adminId !== teamMember.adminId
                ) {
                    throw new CustomError(
                        "This story belongs to the project you do not have an access",
                        403
                    );
                }

                req.story = story;
                next();
            }
        }
    );
}

export const authMiddleware = new AuthMiddleware();
