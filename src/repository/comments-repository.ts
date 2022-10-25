import {CommentsType} from "../types/type";
import {CommentsCollection} from "./db";


export const comments: CommentsType[] = []

export const commentsRepository = {
    async findCommentsByID(id: string): Promise<CommentsType | null> {
        return await CommentsCollection.findOne({id: id}, {projection: {_id: 0}});
    },
    async updateComments(commentId: string, content: string, userId: string): Promise<boolean | null> {
        try {
            const result = await CommentsCollection.updateOne({commentId, userId}, {$set: {content}})
            return result.modifiedCount === 1
        } catch (e) {
            return null
        }

    },
    async deleteComment(id: string, idUser: string): Promise<boolean | null> {
        try {
            const result = await CommentsCollection.deleteOne({id})
            return result.deletedCount === 1
        } catch (error) {
            return null
        }
    },
    async deleteAllComments() {
        return CommentsCollection.deleteMany({})
    }
}