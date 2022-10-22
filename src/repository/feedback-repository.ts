import {FeedbackType} from "../common/type";
import {FeedbackCollection} from "./db";

export const feedback: FeedbackType[] = []

export const feedbackRepository = {
    async createFeedback(newFeedback: FeedbackType): Promise<FeedbackType> {
        await FeedbackCollection.insertOne({...newFeedback})
        return newFeedback
    }
}