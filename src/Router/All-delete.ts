import {Request, Response, Router} from "express";
import {PostsService} from "../Service/Posts-service";
import {BlogsService} from "../Service/Blogs-service";

export const allDelete = Router();

allDelete.delete('/', async (req: Request, res: Response) => {
    await BlogsService.deleteAllBlogger()
    await PostsService.deleteAllPosts()
    res.send(204)
})