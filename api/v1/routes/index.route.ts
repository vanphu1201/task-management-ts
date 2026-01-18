import { Express } from "express";
import { taskRoute } from "./tasks.route";
import { userRoute } from './user.route';

const mainV1Route = (app: Express): void => {

    const version: string = "/api/v1";

    app.use(version + "/tasks", taskRoute);

    app.use(version + "/users", userRoute);
}

export default mainV1Route;