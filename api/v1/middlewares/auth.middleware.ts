import { Request, Response, NextFunction } from 'express';
import User from '../module/user.module';

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.headers.authorization) {
        const token: string = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({
            deleted: false,
            token: token
        }).select(" -password");

        if (!user) {
            res.json({
                code: 400,
                message: "token khong hop le"
            })
            return;
        }
        req["user"] = user;
        next();
    } else {
        res.json({
            code: 400,
            message: "Vui long gui kem theo token"
        });
    }

}