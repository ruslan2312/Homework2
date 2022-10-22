import {Request, Response, Router} from "express";
import {inputValidationMiddleware} from "../middleware/Input-validation-middleware";
import {mwBasicAuth} from "../middleware/authorization-middleware";
import {postsService} from "../service/posts-service";
import {PostsType} from "../types/type";
import {getPostPaginationData} from "../common/paginationData";
import {
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    blogNameValidation
} from "../common/validator";

export const postsRouter = Router()

postsRouter.get('/', async (req: Request, res: Response) => {
    const queryData = getPostPaginationData(req.query)
    const findPosts: PostsType[] = await postsService.findPost(queryData)
    res.status(200).send(findPosts)
})
postsRouter.get('/:id',
    async (req: Request, res: Response) => {
        let video = await postsService.findPostByID(req.params.id)
        if (video) {
            res.status(200).send(video)
        } else {
            res.send(404)
        }
    })
postsRouter.delete('/:id', mwBasicAuth, async (req: Request, res: Response) => {
    const deletePost = await postsService.deletePost(req.params.id)
    if (deletePost) {
        res.send(204)
    } else {
        res.send(404)
    }
})
postsRouter.put('/:id', mwBasicAuth, titleValidation, shortDescriptionValidation, contentValidation,
    blogIdValidation, blogNameValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
        const isUpdate = await postsService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        if (isUpdate) {
            const post = await postsService.findPostByID(req.params.id)
            res.status(204).send(post)
        } else {
            res.send(404)
        }
    })
postsRouter.post('/', mwBasicAuth, titleValidation, shortDescriptionValidation, contentValidation,
    blogIdValidation, blogNameValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
        const newPost = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        res.status(201).send(newPost);

    })


