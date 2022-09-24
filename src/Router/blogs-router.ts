import {Request, Response, Router} from "express";
import {body} from 'express-validator';
import {inputValidationMiddleware} from "../Middleware/input-validation-middleware";
import {BlogsRepository} from "../Repository/blogs-repository";

export const BlogsRouter = Router()


BlogsRouter.get('/', (req: Request, res: Response) => {
    const findBlogs = BlogsRepository.findBlog(req.query.name?.toString())
    res.status(200).send(findBlogs)
})
BlogsRouter.get('/blogs/:id',
    (req: Request, res: Response) => {
        let video = BlogsRepository.findBlogByID(req.params.id)
        if (video) {
            res.status(200).send(video)
        } else {
            res.send(404)
        }
    })
BlogsRouter.delete('/', (req: Request, res: Response) => {
    const deleteBlog = BlogsRepository.deleteBlog(req.params.id)
    if (deleteBlog) {
        res.send(204)
    } else {
        res.send(404)
    }
})

BlogsRouter.put('/blogs/:id', inputValidationMiddleware, (req: Request, res: Response) => {
    const isUpdate = BlogsRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)
    if (isUpdate) {
        const blog = BlogsRepository.findBlogByID(req.params.id)
        res.status(204).send(blog)
    } else {
        res.send(404)
    }
})

BlogsRouter.post('/', inputValidationMiddleware, (req: Request, res: Response) => {
    const newBlog = BlogsRepository.createBlog(req.body.name, req.body.youtubeUrl)
    res.status(201).send(newBlog)
})


