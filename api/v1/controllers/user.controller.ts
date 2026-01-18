import { Request, Response } from "express";
import User from "../module/user.module";
import { generateRandomString } from '../../../helpers/generate';

import md5 from 'md5';

export const register = async (req: Request, res: Response) => {

    const email: string = req.body.email;
    const existEmail: string = await User.findOne({
        email: email,
        deleted: false
    });
    if (existEmail) {
        res.json({
            code: 400,
            message: "Email da ton tai!"
        })
        return;
    }

    req.body.password = md5(req.body.password);

    req.body.token = generateRandomString(20);

    const newUser = new User(req.body);
    const data = await newUser.save();

    const token = data.token;

    res.json({
        code: 200,
        message: "Dang ky tai khoan thanh cong!",
        token: token
    })
}