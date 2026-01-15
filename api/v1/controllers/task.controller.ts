import { Request, Response } from "express";

import Task from "../module/task.module";

export const index = async (req: Request, res: Response) => {
    const find = {
        deleted: false
    };

    if (req.query.status) {
        find["status"] = req.query.status;
    }

    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue
    }
    const tasks = await Task.find(find).sort(sort);
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