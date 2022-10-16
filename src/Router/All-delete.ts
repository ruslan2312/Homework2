import {Request, Response, Router} from "express";
import {PostsService} from "../Service/Posts-service";
import {BlogsService} from "../Service/Blogs-service";
import {UsersService} from "../Service/Users-service";

export const allDelete = Router();

allDelete.delete('/', async (req: Request, res: Response) => {
    await BlogsService.deleteAllBlogger()
    await PostsService.deleteAllPosts()
    await UsersService.deleteAllUsers()
    res.send(204)
})