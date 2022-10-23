import {NextFunction, Request, Response} from "express";
import {usersService} from "../service/users-service";
import {jwtService} from "../application/jwt-service";

export const authTokenMW = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(401)
        return
    }
    const token = req.headers.authorization.split(" ")[1]
    const userId = await jwtService.getUserByIdToken(token)
    if (userId) {
        req.user = await usersService.findUserById(userId)
        next()
        return
    }
    res.send(401)
}
