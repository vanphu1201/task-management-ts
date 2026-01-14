import dotenv from "dotenv";
dotenv.config();

import express, { type Express, type Request, type Response } from "express";

import * as database from "./config/database";
import Task from "./module/task.module";

database.connect();

const app: Express = express();
const port: string | number = process.env.PORT;

app.get("/tasks", async (req: Request, res: Response) => {
    const tasks = await Task.find({
        deleted: false
    });
    res.json({
        tasks: tasks
    })
});

app.get("/tasks/detail/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findOne({
        deleted: false,
        id: id
    });
    console.log(task)
    res.json({
        task: task
    })
});



app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})