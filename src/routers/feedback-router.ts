import {Request, Response, Router} from "express";
import {feedbackService} from "../service/feedback-service";
import {authTokenMW} from "../middleware/authorization-middleware";
import { FeedbackType} from "../types/type";

export const feedbackRouter = Router()

feedbackRouter.post('/', authTokenMW, async (req: Request, res: Response) => {
    const newFeedback = await feedbackService.sendFeedback(req.body.content, req.user!.id)
    res.status(204).send(newFeedback)
})
feedbackRouter.get('/:id', async (req: Request, res: Response) => {
    let feedback: FeedbackType | null = await feedbackService.findFeedbackByID(req.params.id)
    if (feedback) {
        res.status(200).send(feedback)
    } else {
        res.send(404)
    }
})