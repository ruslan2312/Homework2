import {Request, Response, Router} from "express";
import {PostsRepository} from "../Repository/posts-Repository";
import {BlogsRepository} from "../Repository/blogs-repository";

export const allDelete = Router();

allDelete.delete('/', (req: Request, res: Response) => {
    BlogsRepository.deleteAllBlogger()
    PostsRepository.deleteAllPosts()
    res.send(204)
})