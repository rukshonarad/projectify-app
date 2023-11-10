import express from "express";
import { adminRouter } from "./src/routes/admin.routes.js";
import { projectRouter } from "./src/routes/project.routes.js";
import { teamMemberRouter } from "./src/routes/team-member.route.js";
import dotenv from "dotenv";
import { GlobalError } from "./src/middlewares/global-error.middleware.js";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/admin", adminRouter);
app.use("/projects", projectRouter);
app.use("/team-members", teamMemberRouter);
app.use(GlobalError.handle);

app.listen(PORT, () => {
    console.log("Server is running ", PORT);
});
