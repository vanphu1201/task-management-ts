import dotenv from "dotenv";
dotenv.config();

import express, { type Express, type Request, type Response } from "express";

import * as database from "./config/database";
import mainV1Route from "./api/v1/routes/index.route";

database.connect();

const app: Express = express();
const port: string | number = process.env.PORT;

mainV1Route(app)


app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})