import {feedbackRepository} from "../repository/feedback-repository";
import {FeedbackType} from "../types/type";

export const feedbackService = {
    async findFeedbackByID(id: string): Promise<FeedbackType | null> {
        return feedbackRepository.findFeedbackByID(id)
    },
    async sendFeedback(content: string, id: string): Promise<FeedbackType> {
        const newFeedback = {
            id: id,
            content: content,
        }
        return await feedbackRepository.createFeedback(newFeedback)
    }
}


