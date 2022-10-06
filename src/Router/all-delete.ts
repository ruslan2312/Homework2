import {Request, Response, Router} from "express";
import {PostsRepository} from "../Repository/posts-Repository";
import {BlogsRepository} from "../Repository/blogs-repository";

export const allDelete = Router();

allDelete.delete('/', async (req: Request, res: Response) => {
    await BlogsRepository.deleteAllBlogger()
    await PostsRepository.deleteAllPosts()
    res.send(204)
})