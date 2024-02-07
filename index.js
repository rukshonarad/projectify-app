import express from "express";
import { adminRouter } from "./src/routes/admin.routes.js";
import { projectRouter } from "./src/routes/project.routes.js";
import { teamMemberRouter } from "./src/routes/team-member.routes.js";
import dotenv from "dotenv";
import { GlobalError } from "./src/middlewares/global-error.middleware.js";
import { storyRouter } from "./src/routes/story.routes.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3030;

app.use("/admins", adminRouter);
app.use("/projects", projectRouter);
app.use("/team-members", teamMemberRouter);
app.use("/stories", storyRouter);
app.use(GlobalError.handle);

app.listen(PORT, () => {
    console.log("Server is running ", PORT);
});
