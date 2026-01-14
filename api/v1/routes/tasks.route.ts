import { Request, Response, Router } from "express";
const route: Router = Router();

import Task from "../../../module/task.module";

route.get("/", async (req: Request, res: Response) => {
    const tasks = await Task.find({
        deleted: false
    });
    console.log(tasks)
    res.json({
        tasks: tasks
    })
});

route.get("/detail/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findOne({
        deleted: false,
        _id: id
    });
    console.log("------------")
    console.log(req.params.id)
    res.json({
        task: task
    })
});

export const taskRoute: Router = route;