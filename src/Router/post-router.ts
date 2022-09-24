import {Request, Response, Router} from "express";
import {body} from 'express-validator';
import {inputValidationMiddleware} from "../Middleware/input-validation-middleware";

export const PostRouter = Router()

PostRouter.get('/', (req: Request, res: Response) => {


})
PostRouter.post('/', inputValidationMiddleware, (req: Request, res: Response) => {


})
PostRouter.put('/', inputValidationMiddleware, (req: Request, res: Response) => {


})
PostRouter.delete('/', (req: Request, res: Response) => {


})

