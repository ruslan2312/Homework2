import {FeedbackType} from "../types/type";
import {FeedbackCollection} from "./db";

export const feedback: FeedbackType[] = []

export const feedbackRepository = {
    async findFeedbackByID(id: string): Promise<FeedbackType | null> {
        return await FeedbackCollection.findOne({id: id}, {projection: {_id: 0}});
    },
    async createFeedback(newFeedback: FeedbackType): Promise<FeedbackType> {
        await FeedbackCollection.insertOne({...newFeedback})
        return newFeedback
    }
}