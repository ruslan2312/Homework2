import {Request, Response, Router} from "express";
import {commentsService} from "../service/comments-service";
import {authTokenMW} from "../middleware/authorization-middleware";
import {CommentsType} from "../types/type";
import {blogsService} from "../service/blogs-service";

export const commentsRouter = Router()
commentsRouter.get('/:id', async (req: Request, res: Response) => {
    let feedback: CommentsType | null = await commentsService.findCommentsByID(req.params.id)
    if (feedback) {
        res.status(200).send(feedback)
    } else {
        res.send(404)
    }
})
commentsRouter.post('/', authTokenMW, async (req: Request, res: Response) => {
    const newFeedback = await commentsService.createComments(req.user!.id, req.body.content,)
    res.status(204).send(newFeedback)
})
commentsRouter.put('/id', authTokenMW, async (req: Request, res: Response) => {
    const isUpdate: boolean = await commentsService.updateComments(req.body.id, req.body.content, req.user.id)
    if (isUpdate) {
        const blog = await blogsService.findBlogByID(req.params.id)
        res.status(204).send(blog)
    } else {
        res.send(404)
    }
})