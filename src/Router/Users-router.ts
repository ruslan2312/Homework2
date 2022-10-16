import express, {Request, Response, Router} from "express";
import {getPaginationData} from "../Common/GetPaginationData";
import {UsersService} from "../Service/Users-service";


export const UsersRouter = Router()

UsersRouter.get('/', async (req: Request, res: Response) => {
   const findUser = UsersService.findUser()
    res.send(findUser)
})

UsersRouter.post('/', async (req: Request, res: Response) => {
    const newUser = UsersService.createUser(req.body.login, req.body.email, req.body.password)
    res.status(204).send(newUser)
})
UsersRouter.delete('/', async (req: Request, res: Response) => {
    const deleteUsers = UsersService.deleteUser()
    res.send(deleteUsers)
})
