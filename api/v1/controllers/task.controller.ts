import { Request, Response } from "express";

import Task from "../module/task.module";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";
import { title } from "node:process";

export const index = async (req: Request, res: Response) => {
    // Find
    interface find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }

    const find: find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status.toString();
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

    // Search
    let objectSearch = searchHelper(req.query);
    if (req.query.keyword) {
        find.title= objectSearch.regex;
    }
    // End Search

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