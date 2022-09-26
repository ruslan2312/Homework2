import {Request, Response, Router} from "express";
import {body} from 'express-validator';
import {inputValidationMiddleware} from "../Middleware/input-validation-middleware";
import {PostsRepository} from "../Repository/posts-Repository";

export const PostsRouter = Router()

const titleValidation = body('title').trim().isLength({min: 1, max: 30})
const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 1, max: 100})
const contentValidation = body('content').trim().isLength({min: 1, max: 1000})
const bloggerIdValidation = body('bloggerId').isInt()
const bloggerNameValidation = body('bloggerName').trim().isLength({min: 1, max: 30}).optional()


PostsRouter.get('/', (req: Request, res: Response) => {
    const findPosts = PostsRepository.findPost(req.query.name?.toString())
    res.status(200).send(findPosts)
})
PostsRouter.get('/:id',
    (req: Request, res: Response) => {
        let video = PostsRepository.findPostByID(+req.params.id)
        if (video) {
            res.status(200).send(video)
        } else {
            res.send(404)
        }
    })
PostsRouter.delete('/:id', (req: Request, res: Response) => {
    const deletePost = PostsRepository.deletePost(+req.params.id)
    if (deletePost) {
        res.send(204)
    } else {
        res.send(404)
    }
})

PostsRouter.put('/:id', titleValidation, shortDescriptionValidation, contentValidation,
    bloggerIdValidation, bloggerNameValidation, inputValidationMiddleware, (req: Request, res: Response) => {
        const isUpdate = PostsRepository.updatePost(+req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId,
            req.body.bloggerName
        )
        if (isUpdate) {
            const post = PostsRepository.findPostByID(+req.params.id)
            res.status(204).send(post)
        } else {
            res.send(404)
        }
    })

PostsRouter.post('/', titleValidation, shortDescriptionValidation, contentValidation,
    bloggerIdValidation, bloggerNameValidation, inputValidationMiddleware, (req: Request, res: Response) => {
        const newPost = PostsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.bloggerId, req.body.bloggerName)
        res.status(201).send(newPost)
    })


