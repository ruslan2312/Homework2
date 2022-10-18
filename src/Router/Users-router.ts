import {Request, Response, Router} from "express";
import {UsersService} from "../Service/Users-service";
import {usersEmailValidation, usersLoginValidation, usersPasswordValidation} from "../Common/Validator";
import {mwBasicAuth} from "../Middleware/Authorization-middleware";
import {UserType} from "../Common/Type";
import {inputValidationMiddleware} from "../Middleware/Input-validation-middleware";


export const UsersRouter = Router()

UsersRouter.get('/', async (req: Request, res: Response) => {
    const findUser: UserType[] = await UsersService.findUsers()
    res.status(200).send(findUser)
})
debugger
UsersRouter.post('/', usersEmailValidation, usersPasswordValidation, usersLoginValidation, mwBasicAuth, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newUser = await UsersService.createUser(req.body.login, req.body.email, req.body.password)
    console.log(newUser)
    res.status(201).send(newUser)
})
UsersRouter.delete('/', async (req: Request, res: Response) => {
    const deleteUsers = await UsersService.deleteUser()
    if (deleteUsers) {
        res.send(204)
    } else {
        res.send(404)
    }
})
