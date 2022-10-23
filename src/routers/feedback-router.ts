import {Request, Response, Router} from "express";
import {feedbackService} from "../service/feedback-service";
import {authTokenMW} from "../middleware/authorization-middleware";

export const feedbackRouter = Router()

feedbackRouter.post('/', authTokenMW, async (req: Request, res: Response) => {
    const newFeedback = await feedbackService.sendFeedback(req.body.content, req.user!.id)
    res.status(204).send(newFeedback)
})