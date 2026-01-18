import { Request, Response } from "express";
import User from "../module/user.module";
import { generateRandomString } from '../../../helpers/generate';

import md5 from 'md5';


// [POST] /api/v1/users/register
export const register = async (req: Request, res: Response) => {

    const email: string = req.body.email;
    const existEmail = await User.findOne({
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

// [POST] /api/v1/users/login
export const login = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = md5(req.body.password);

    const existEmail = await User.findOne({
        deleted: false,
        email: email,
    });
    
    if (!existEmail) {
        res.json({
            code : 400,
            message: "Email khong ton tai!"
        })
        return;
    }

    const user = await User.findOne({
        deleted: false,
        email: email,
        password: password
    });

    if (!user) {
        res.json({
            code: 400,
            message: "Sai mat khau"
        })
        return;
    }

    const token = user.token;

    res.json({
        code: 200,
        message: "Dang nhap thanh cong",
        token: token
    })
}