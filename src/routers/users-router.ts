import {Request, Response, Router} from "express";
import {usersService} from "../service/users-service";
import {usersEmailValidation, usersLoginValidation, usersPasswordValidation} from "../common/validator";
import {UserType} from "../types/type";
import {inputValidationMiddleware} from "../middleware/Input-validation-middleware";
import {UsersPaginationData} from "../common/blogPaginationData";
import {mwBasicAuth} from "../middleware/MwBasic";

export const usersRouter = Router()

usersRouter.get('/', async (req: Request, res: Response) => {
    const queryData = UsersPaginationData(req.query)
    const findUser: UserType[] = await usersService.findUsers(queryData)
    res.status(200).send(findUser)
})
usersRouter.post('/', usersEmailValidation, usersPasswordValidation, usersLoginValidation, mwBasicAuth, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newUser = await usersService.createUser(req.body.login, req.body.email, req.body.password)
    console.log(newUser)
    res.status(201).send(newUser)
})
usersRouter.delete('/:id', mwBasicAuth, inputValidationMiddleware, async (req: Request, res: Response) => {
    const deleteUsers = await usersService.deleteUser(req.params.id)
    if (deleteUsers) {
        res.send(204)
    } else {
        res.send(404)
    }
})
