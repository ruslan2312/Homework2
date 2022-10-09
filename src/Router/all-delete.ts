import {Request, Response, Router} from "express";
import {BlogsRepository} from "../Repository/blogs-repository";
import {PostsService} from "../Service/posts-service";

export const allDelete = Router();

allDelete.delete('/', async (req: Request, res: Response) => {
    await BlogsRepository.deleteAllBlogger()
    await PostsService.deleteAllPosts()
    res.send(204)
})