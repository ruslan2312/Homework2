import {Request, Response, Router} from "express";
import {UsersService} from "../Service/Users-service";
import {log} from "util";

export const AuthRouter = Router()

AuthRouter.post('/login', async (req: Request, res: Response) => {
    const checkResult = await UsersService.checkCredentials(req.body.login, req.body.password)
    if (checkResult) {
        res.sendStatus(204)
    } else {
        res.sendStatus(401)
    }

})