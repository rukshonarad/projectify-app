import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";
import { projectService } from "../services/project.service.js";

class ProjectController {
    create = catchAsync(async (req, res) => {
        const { body, adminId } = req;
        const input = {
            name: body.name,
            description: body.description,
            startDate: body.startDate,
            endDate: body.endDate
        };

        if (
            !input.name ||
            !input.description ||
            !input.startDate ||
            !input.endDate
        ) {
            throw new CustomError("All Fields are required", 400);
        }

        if (new Date(input.startDate) >= new Date(input.endDate)) {
            throw new CustomError(
                "Start Date cannot be greated than End Date",
                400
            );
        }

        const project = await projectService.create(input, adminId);

        res.status(201).json({
            data: project
        });
    });

    getOne = catchAsync(async (req, res) => {
        const { adminId, params } = req;

        const project = await projectService.getOne(params.id, adminId);

        res.status(200).json({
            data: project
        });
    });

    update = catchAsync(async (req, res) => {
        const { body, params, adminId } = req;
        const update = {};

        if (body.name) {
            update.name = body.name;
        }
        if (body.description) {
            update.description = body.description;
        }
        if (body.startDate) {
            update.startDate = body.startDate;
        }
        if (body.endDate) {
            update.endDate = body.endDate;
        }

        if (
            !update.name &&
            !update.description &&
            !update.name &&
            !update.description
        ) {
            throw new CustomError("No update data provided", 400);
        }
        if (
            (update.startDate && !update.endDate) ||
            (!update.startDate && update.endDate)
        ) {
            throw new CustomError(
                "Both Start date and End date is required",
                400
            );
        }

        if (new Date(update.startDate) >= new Date(update.endDate)) {
            throw new CustomError(
                "End date cannot be equal or less than Start date",
                400
            );
        }

        await projectService.update(params.id, adminId, update);
        res.status(204).send();
    });

    getAll = catchAsync(async (req, res) => {
        const { adminId } = req;

        const projects = await projectService.getAll(adminId);
        res.status(200).json({
            data: projects
        });
    });

    changeStatus = catchAsync(async (req, res) => {
        const { body, params, adminId } = req;

        await projectService.changeStatus(params.id, adminId, body.status);
        res.status(204).send();
    });

    addContributor = catchAsync(async (req, res) => {
        const { adminId, body } = req;

        if (!body.teamMemberId || !body.projectId) {
            throw new CustomError(
                "All fields are required: teamMemberId, projectId",
                400
            );
        }

        await projectService.addContributor(
            body.projectId,
            body.teamMemberId,
            adminId
        );

        res.status(200).json({
            message: `Team member with ${body.teamMemberId} id was added to project with ${body.projectId} id`
        });
    });

    deactivateContributor = catchAsync(async (req, res) => {
        const { adminId, body } = req;

        if (!body.teamMemberId || !body.projectId) {
            throw new CustomError(
                "All fields are required: teamMemberId, projectId",
                400
            );
        }

        await projectService.changeContributorStatus(
            body.projectId,
            body.teamMemberId,
            adminId,
            "INACTIVE"
        );

        res.status(204).send();
    });

    reactivateContributor = catchAsync(async (req, res) => {
        const { adminId, body } = req;

        if (!body.teamMemberId || !body.projectId) {
            throw new CustomError(
                "All fields are required: teamMemberId, projectId",
                400
            );
        }

        await projectService.changeContributorStatus(
            body.projectId,
            body.teamMemberId,
            adminId,
            "ACTIVE"
        );

        res.status(204).send();
    });
}

export const projectController = new ProjectController();
