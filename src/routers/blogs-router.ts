import {Request, Response, Router} from "express";
import {inputValidationMiddleware} from "../middleware/Input-validation-middleware";
import {mwBasicAuth} from "../middleware/MwBasic";
import {blogsService} from "../service/blogs-service";
import {PostsType, BlogsType} from "../types/type";
import {findPostByIdTypePaginationData, paginationData} from "../common/paginationData";
import {
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogNameValidation,
    nameValidation,
    youtubeUrlValidation
} from "../common/validator";


export const blogsRouter = Router()

blogsRouter.get('/', async (req: Request, res: Response) => {
    const queryData = paginationData(req.query);
    const findBlogs: BlogsType[] = await blogsService.findBlog(queryData);
    res.status(200).send(findBlogs)
})
blogsRouter.get('/:id',
    async (req: Request, res: Response) => {
        let post: BlogsType | null = await blogsService.findBlogByID(req.params.id)
        if (post) {
            res.status(200).send(post)
        } else {
            res.send(404)
        }
    })
blogsRouter.get('/:blogId/posts',
    async (req: Request, res: Response) => {
        const queryData = findPostByIdTypePaginationData(req.query)
        const post: PostsType[] = await blogsService.findBlogAndPostByID(queryData, req.params.blogId)
        if (post) {
            res.status(200).send(post)
        } else {
            res.send(404)
        }
    })
blogsRouter.post('/', mwBasicAuth, nameValidation, youtubeUrlValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newBlog: BlogsType = await blogsService.createBlog(req.body.name, req.body.youtubeUrl)
    res.status(201).send(newBlog)
})
blogsRouter.post('/:blogId/posts', mwBasicAuth, titleValidation, shortDescriptionValidation, contentValidation,
    blogNameValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
        const newPost: PostsType | null = await blogsService.createPostByBlog(req.params.blogId, req.body.title, req.body.shortDescription, req.body.content)
        if (newPost) {
            res.status(201).send(newPost)
        }
        res.status(404).send()
    })
blogsRouter.put('/:id', mwBasicAuth, nameValidation, youtubeUrlValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdate: boolean = await blogsService.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)
    if (isUpdate) {
        const blog = await blogsService.findBlogByID(req.params.id)
        res.status(204).send(blog)
    } else {
        res.send(404)
    }
})
blogsRouter.delete('/:id', mwBasicAuth, async (req: Request, res: Response) => {
    const deleteBlog = await blogsService.deleteBlog(req.params.id)
    if (deleteBlog) {
        res.send(204)
    } else {
        res.send(404)
    }
})


