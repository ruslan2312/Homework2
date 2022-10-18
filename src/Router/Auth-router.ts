import {Request, Response, Router} from "express";
import {UsersService} from "../Service/Users-service";
import {usersEmailValidation, usersPasswordValidation} from "../Common/Validator";
import {inputValidationMiddleware} from "../Middleware/Input-validation-middleware";

export const AuthRouter = Router()
AuthRouter.post('/login', usersEmailValidation, usersPasswordValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    debugger
    const checkResult = await UsersService.checkCredentials(req.body.login, req.body.password)
    if (checkResult) {
        res.sendStatus(204)
    } else {
        res.sendStatus(401)
    }
})
