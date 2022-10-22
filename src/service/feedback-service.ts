import {feedbackRepository} from "../repository/feedback-repository";
import {FeedbackType} from "../common/type";

export const feedbackService = {
    async sendFeedback(content: string, id: string): Promise<FeedbackType> {
        const newFeedback = {
            id: id,
            content: content,
        }
        return await feedbackRepository.createFeedback(newFeedback)
    }
}


