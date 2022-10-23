import {Request, Response, Router} from "express";
import {usersService} from "../service/users-service";
import {jwtService} from "../application/jwt-service";
import {usersEmailValidation} from "../common/validator";
import {inputValidationMiddleware} from "../middleware/Input-validation-middleware";
import {authTokenMW} from "../middleware/authorization-middleware";

export const authRouter = Router()
authRouter.post('/login', usersEmailValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const user = await usersService.checkCredentials(req.body.login, req.body.password)
    if (user) {
        const token = await jwtService.createJWT(user)
        res.status(200).send({accessToken: token})
    } else {
        res.sendStatus(401)
    }
})
authRouter.get('/me', authTokenMW, async (req: Request, res: Response) => {
    const email = req.user.email
    const login = req.user.login;
    const userId = req.user.id
    debugger
    if (email && login && userId) {
        res.send({email, login, userId})
    } else {
        res.sendStatus(401)
    }
})
