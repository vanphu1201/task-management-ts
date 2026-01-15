import { Request, Response } from "express";

import Task from "../module/task.module";
import paginationHelper from "../../../helpers/pagination";

export const index = async (req: Request, res: Response) => {
    // Find
    const find = {
        deleted: false
    };

    if (req.query.status) {
        find["status"] = req.query.status;
    }
    // End Find

    // Sort
    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue
    }
    // End sort
    
     // Pagination
        let initPagination = {
            currentPage: 1,
            limitItems: 2
        };
        const countTask = await Task.countDocuments(find);
        const objectPagination = paginationHelper(
            initPagination,
            req.query,
            countTask
        );
        // End Pagination
        
    const tasks = await Task
        .find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
        
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