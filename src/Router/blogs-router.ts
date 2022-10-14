import {Request, Response, Router} from "express";
import {inputValidationMiddleware} from "../Middleware/input-validation-middleware";
import {mwBasicAuth} from "../Middleware/authorization-middleware";
import {BlogsService} from "../Service/blogs-service";
import {PostsType, BlogsType} from "../Common/Type";
import {getBlogPaginationData} from "../Common/GetBlogPaginationData";
import {
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogNameValidation,
    nameValidation,
    youtubeUrlValidation
} from "../Common/validator";

export const BlogsRouter = Router()


BlogsRouter.get('/', async (req: Request, res: Response) => {
    const queryData = getBlogPaginationData(req.query);
    const findBlogs: BlogsType[] = await BlogsService.findBlog(queryData);
    res.status(200).send(findBlogs)
})
BlogsRouter.get('/:id',
    async (req: Request, res: Response) => {
        let video: BlogsType | null = await BlogsService.findBlogByID(req.params.id)
        if (video) {
            res.status(200).send(video)
        } else {
            res.send(404)
        }
    })
BlogsRouter.get('/:id/posts',
    async (req: Request, res: Response) => {
        console.log(req.params.id)
        let post: PostsType | null = await BlogsService.findBlogAndPostByID(req.params.id)
        if (post) {
            res.status(200).send(post)
        } else {
            res.send(404)
        }
    })
BlogsRouter.delete('/:id', mwBasicAuth, async (req: Request, res: Response) => {
    const deleteBlog = await BlogsService.deleteBlog(req.params.id)
    if (deleteBlog) {
        res.send(204)
    } else {
        res.send(404)
    }
})

BlogsRouter.put('/:id', mwBasicAuth, nameValidation, youtubeUrlValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdate: boolean = await BlogsService.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)
    if (isUpdate) {
        const blog = await BlogsService.findBlogByID(req.params.id)
        res.status(204).send(blog)
    } else {
        res.send(404)
    }
})

BlogsRouter.post('/', mwBasicAuth, nameValidation, youtubeUrlValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newBlog: BlogsType = await BlogsService.createBlog(req.body.name, req.body.youtubeUrl)
    res.status(201).send(newBlog)
})

BlogsRouter.post('/:blogId/posts', mwBasicAuth, titleValidation, shortDescriptionValidation, contentValidation,
    blogNameValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
        const newPost: PostsType | null = await BlogsService.createPostByBlog(req.params.blogId, req.body.title, req.body.shortDescription, req.body.content)
        if (newPost) {
            res.status(201).send(newPost)
        }
        res.status(404).send()
    })


