import {Request, Response, Router} from "express";
import {body} from 'express-validator';
import {inputValidationMiddleware} from "../Middleware/input-validation-middleware";
import {mwBasicAuth} from "../Middleware/authorization-middleware";
import {PostsRepository} from "../Repository/posts-Repository";
import {PostsService} from "../Service/posts-service";

export const PostsRouter = Router()

const titleValidation = body('title').trim().isLength({min: 1, max: 30})
const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 1, max: 100})
const contentValidation = body('content').trim().isLength({min: 1, max: 1000})
const blogIdValidation = body('blogId').isString().isLength({min: 1, max: 30})
const blogNameValidation = body('blogName').trim().isLength({min: 1, max: 30}).optional()


PostsRouter.get('/', async (req: Request, res: Response) => {
    const findPosts = await PostsService.findPost(req.query.name?.toString())
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
    const deletePost =await PostsService.deletePost(req.params.id)
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
            const post =await PostsService.findPostByID(req.params.id)
            res.status(204).send(post)
        } else {
            res.send(404)
        }
    })

PostsRouter.post('/', mwBasicAuth, titleValidation, shortDescriptionValidation, contentValidation,
    blogIdValidation, blogNameValidation, inputValidationMiddleware,  async (req: Request, res: Response) => {
        const newPost = await PostsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        res.status(201).send(newPost);

    })


