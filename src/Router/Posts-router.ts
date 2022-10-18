import {Request, Response, Router} from "express";
import {inputValidationMiddleware} from "../Middleware/Input-validation-middleware";
import {mwBasicAuth} from "../Middleware/Authorization-middleware";
import {PostsService} from "../Service/Posts-service";
import {PostsType} from "../Common/Type";
import {getPostPaginationData} from "../Common/GetBlogPaginationData";
import {
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    blogNameValidation
} from "../Common/Validator";

export const PostsRouter = Router()

PostsRouter.get('/', async (req: Request, res: Response) => {
    const queryData = getPostPaginationData(req.query)
    const findPosts: PostsType[] = await PostsService.findPost(queryData)
    res.status(200).send(findPosts)
})
PostsRouter.get('/:id',
    async (req: Request, res: Response) => {
        let video = await PostsService.findPostByID(req.params.id)
        if (video) {
            res.status(200).send(video)
        } else {
            res.send(404)
        }
    })
PostsRouter.delete('/:id', mwBasicAuth, async (req: Request, res: Response) => {
    const deletePost = await PostsService.deletePost(req.params.id)
    if (deletePost) {
        res.send(204)
    } else {
        res.send(404)
    }
})
PostsRouter.put('/:id', mwBasicAuth, titleValidation, shortDescriptionValidation, contentValidation,
    blogIdValidation, blogNameValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
        const isUpdate = await PostsService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        if (isUpdate) {
            const post = await PostsService.findPostByID(req.params.id)
            res.status(204).send(post)
        } else {
            res.send(404)
        }
    })
PostsRouter.post('/', mwBasicAuth, titleValidation, shortDescriptionValidation, contentValidation,
    blogIdValidation, blogNameValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
        const newPost = await PostsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        res.status(201).send(newPost);

    })


