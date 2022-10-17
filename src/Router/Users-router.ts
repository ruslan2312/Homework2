import {Request, Response, Router} from "express";
import {UsersService} from "../Service/Users-service";
import {UserType} from "../Common/Type";


export const UsersRouter = Router()

UsersRouter.get('/', async (req: Request, res: Response) => {
    const findUser = UsersService.findUser()
    res.send(findUser)
})
debugger
UsersRouter.post('/', async (req: Request, res: Response) => {
    const newUser = await UsersService.createUser(req.body.login, req.body.email, req.body.password)
    res.status(204).send(newUser)
})
UsersRouter.delete('/', async (req: Request, res: Response) => {
    const deleteUsers = UsersService.deleteUser()
    res.send(deleteUsers)
})
