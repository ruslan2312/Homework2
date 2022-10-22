import {Request, Response, Router} from "express";
import {usersService} from "../service/users-service";
import {jwtService} from "../application/jwt-service";
import {usersEmailValidation} from "../common/validator";
import {inputValidationMiddleware} from "../middleware/Input-validation-middleware";

export const authRouter = Router()
authRouter.post('/login', usersEmailValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    debugger
    const user = await usersService.checkCredentials(req.body.login, req.body.password)
    if (user) {
        const token = await jwtService.createJWT(user)
        res.status(201).send(token)
    } else {
        res.sendStatus(401)
    }
})
