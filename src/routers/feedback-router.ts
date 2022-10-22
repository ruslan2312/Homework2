import {Request, Response, Router} from "express";
import {feedbackService} from "../service/feedback-service";
import {authorizationMW} from "../middleware/authorization";

export const feedbackRouter = Router()

feedbackRouter.post('/', authorizationMW, async (req: Request, res: Response) => {
    const newFeedback = await feedbackService.sendFeedback(req.body.content, req.user!.id)
    res.status(204).send(newFeedback)
})