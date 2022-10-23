import {commentsRepository} from "../repository/comments-repository";
import {CommentsType} from "../types/type";

export const commentsService = {
    async findCommentsByID(id: string): Promise<CommentsType | null> {
        return commentsRepository.findCommentsByID(id)
    },
    async createComments(id: string, content: string): Promise<CommentsType> {
        const newFeedback = {
            id: id,
            content: content,
        }
        return await commentsRepository.createComments(newFeedback)
    },
    async updateComments(id: string, content: string, userId: string): Promise<boolean> {
        return await commentsRepository.updateComments(id, content,userId)
    }
}


