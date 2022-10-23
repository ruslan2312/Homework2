import {CommentsType} from "../types/type";
import {CommentsCollection} from "./db";


export const comments: CommentsType[] = []

export const commentsRepository = {
    async findCommentsByID(id: string): Promise<CommentsType | null> {
        return await CommentsCollection.findOne({id: id}, {projection: {_id: 0, postId: 0}});
    },
    async createComments(newComments: CommentsType): Promise<CommentsType> {
        await CommentsCollection.insertOne({...newComments})
        return newComments
    },
    async updateComments(id: string, content: string, userId: string): Promise<boolean> {
        const idR = await this.findCommentsByID(id)
        if (idR!.userId === userId) {
            const result = await CommentsCollection.updateOne({id: id}, {$set: {content: content}})
            return result.matchedCount === 1
        }
        return false
    }
}