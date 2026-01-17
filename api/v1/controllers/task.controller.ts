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
        find.title = objectSearch.regex;
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
// [GET] /api/v1/tasks/detail/:id
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

// [PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id.toString();
        const status: string = req.body.status;
        if (id && status) {
            await Task.updateOne({ _id: id }, { status: status });
        }

        res.json({
            code: 200,
            message: "Doi trang thai cong viec thanh cong"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}

// [PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;
        const key: string = req.body.key;
        const value: string = req.body.value;

        switch (key) {
            case "status":
                await Task.updateMany({_id: {$in: ids}}, {status: value});
                
                res.json({
                    code: 200,
                    message: "Cap nhap trang thai thamh cong"
                })

                break;
        
            default:
                res.json({
                    code: 400,
                    message: "Khong ton tai"
                })
                break;
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Loi cap nhaptrang thai!"
        })
    }
}

// [POST] /api/v1/tasks/create
export const create = async (req: Request, res: Response) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();

        res.json({
            code: 200,
            message: "Tai moi cong viec thanh cong",
            data: newTask
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Tao moi cong viec that bai"
        })
    }
}
