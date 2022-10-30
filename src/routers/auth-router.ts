import {Request, Response, Router} from "express";
import {usersService} from "../service/users-service";
import {jwtService} from "../application/jwt-service";
import {
    authLoginValidation, authPasswordValidation,
    usersEmailValidation,
    usersEmailValidationResending,
    usersLoginValidation,
    usersPasswordValidation
} from "../common/validator";
import {inputValidationMiddleware} from "../middleware/Input-validation-middleware";
import {authTokenMW} from "../middleware/authorization-middleware";
import {authService} from "../service/auth-service";

export const authRouter = Router()
// take token Auth
authRouter.post('/login', authLoginValidation, authPasswordValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    debugger
    const user = await usersService.checkCredentials(req.body.login, req.body.password)
    debugger
    if (user) {
        const token = await jwtService.createJWT(user)
        res.status(200).send({accessToken: token})
    } else {
        res.sendStatus(401)
    }
})
// registration add new user
authRouter.post('/registration', usersLoginValidation, usersPasswordValidation, usersEmailValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const login = req.body.login
    const password = req.body.password
    const email = req.body.email
    const user = await usersService.createUser(login, email, password)
    if (user) {
        res.sendStatus(204)
    } else {
        res.sendStatus(400)
    }
})
authRouter.post('/registration-email-resending', usersEmailValidationResending, inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const email = req.body.email
        const resendingEmail = await authService.resentEmail(email)
        debugger
        if (resendingEmail) {
            res.sendStatus(204)
        } else return res.sendStatus(400)
    })
authRouter.post('/registration-confirmation', inputValidationMiddleware, async (req: Request, res: Response) => {
    const code = req.body.code
    const registrationConfirm = await authService.registrationConfirm(code)
    if (registrationConfirm) {
        res.sendStatus(204)
    } else res.sendStatus(400)
})

authRouter.get('/me', authTokenMW, async (req: Request, res: Response) => {
    const email = req.user.email
    const login = req.user.login;
    const userId = req.user.id
    if (email && login && userId) {
        res.send({email, login, userId})
    } else {
        res.sendStatus(401)
    }
})
