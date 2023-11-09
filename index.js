import express from "express";
import { userRouter } from "./src/routes/user.routes.js";
import { projectRouter } from "./src/routes/project.routes.js";
import dotenv from "dotenv";
import { GlobalError } from "./src/middlewares/global-error.middleware.js";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use(GlobalError.handle);

app.listen(PORT, () => {
    console.log("Server is running ", PORT);
});
