import {Request, Response, Router} from "express";
import {commentsService} from "../service/comments-service";
import {authTokenMW} from "../middleware/authorization-middleware";
import {CommentsType} from "../types/type";
import {commentsContentValidation} from "../common/validator";
import {inputValidationMiddleware} from "../middleware/Input-validation-middleware";

export const commentsRouter = Router()
commentsRouter.get('/:id', async (req: Request, res: Response) => {
    let feedback: CommentsType | null = await commentsService.findCommentsByID(req.params.id)
    if (feedback) {
        res.status(200).send(feedback)
    } else {
        res.send(404)
    }
})
// commentsRouter.post('/', authTokenMW, async (req: Request, res: Response) => {
//     const newFeedback = await commentsService.createComments(req.user!.id, req.body.content,)
//     res.status(204).send(newFeedback)
// })
commentsRouter.put('/:commentId', authTokenMW, commentsContentValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const email = req!.user!.email
    const login = req!.user!.login;
    const userId = req!.user!.id
    const commentsUserId = await commentsService.findCommentsByID(req.params.commentId)
    try {
        if (email && login && userId === commentsUserId!.userId) {
            const isUpdate: boolean = await commentsService.updateComments(req.params.commentId, req.body.content, req.user.id)
            if (isUpdate) {
                res.sendStatus(204)
            } else res.sendStatus(404)
        } else {
            res.sendStatus(403)
        }
    } catch (e) {
        res.sendStatus(404)
        console.log("warning")
    }
})
commentsRouter.delete('/:commentId', authTokenMW, async (req: Request, res: Response) => {
    const email = req!.user!.email
    const login = req!.user!.login;
    const userId = req!.user!.id
    const commentsUserId = await commentsService.findCommentsByID(req.params.commentId)
    try {
        if (email && login && userId === commentsUserId!.userId) {
            const deleteComment = await commentsService.deleteComment(req.params.commentId, req.user.id)
            if (deleteComment) {
                res.sendStatus(204)
            } else res.sendStatus(404)
        } else {
            res.sendStatus(403)
        }
    } catch (e) {
        res.sendStatus(404)
    }
})

