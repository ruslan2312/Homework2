import {deleteAllRepository} from "../Repository/delete-all-repository";
import {Request, Response, Router} from "express";

export const allDelete = Router();

allDelete.delete('/testing/all-data', (req: Request, res: Response) => {
    deleteAllRepository.deleteAllBlogger()
    deleteAllRepository.deleteAllPosts()
    res.send(204)
})