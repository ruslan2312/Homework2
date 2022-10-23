import {Request, Response, Router} from "express";
import {inputValidationMiddleware} from "../middleware/Input-validation-middleware";
import {mwBasicAuth} from "../middleware/MwBasic";
import {postsService} from "../service/posts-service";
import {CommentsType, PostsType} from "../types/type";
import {CommentsPaginationData, getPostPaginationData} from "../common/blogPaginationData";
import {
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    blogNameValidation, commentsContentValidation
} from "../common/validator";
import {authTokenMW} from "../middleware/authorization-middleware";

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

/// COMMENTS ==========================================================================================================
postsRouter.get('/:postId/comments', async (req: Request, res: Response) => {
    const queryData = CommentsPaginationData(req.query)
    const findCommentsByPostId: CommentsType | null | undefined = await postsService.findCommentsByPostId(queryData, req.params.postId)
    res.status(200).send(findCommentsByPostId)
})
postsRouter.post('/:postId/comments', authTokenMW, commentsContentValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newComments = await postsService.createCommentsById(req.body.content, req.params.postId, req.user.id, req.user.login)
    res.status(201).send(newComments);
})



