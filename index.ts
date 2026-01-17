import dotenv from "dotenv";
dotenv.config();

import express, { type Express, type Request, type Response } from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import * as database from "./config/database";
import mainV1Route from "./api/v1/routes/index.route";

database.connect();

const app: Express = express();
const port: string | number = process.env.PORT;

// const corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));

app.use(cors());
app.use(bodyParser.json());

mainV1Route(app);


app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})