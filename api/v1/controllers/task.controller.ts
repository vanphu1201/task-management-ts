import { Request, Response } from "express";

import Task from "../../../module/task.module";

export const index = async (req: Request, res: Response) => {
    const tasks = await Task.find({
        deleted: false
    });
    console.log(tasks)
    res.json({
        tasks: tasks
    })
}

export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findOne({
        deleted: false,
        _id: id
    });
    res.json({
        task: task
    })
}