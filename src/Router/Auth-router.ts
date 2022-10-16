import {Request, Response, Router} from "express";
import {UsersService} from "../Service/Users-service";

export const AuthRouter = Router()

AuthRouter.post('/login'), async (req: Request, res: Response) => {
    const checkResult = await UsersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    res.status(200)
}