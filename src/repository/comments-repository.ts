import {CommentsType} from "../types/type";
import {CommentsCollection} from "./db";


export const comments: CommentsType[] = []

export const commentsRepository = {
    async findCommentsByID(id: string): Promise<CommentsType | null> {
        return await CommentsCollection.findOne({id: id}, {projection: {_id: 0, postId: 0}});
    },
    // async createComments(newComments: CommentsType): Promise<CommentsType> {
    //     await CommentsCollection.insertOne({...newComments})
    //     return newComments
    // },
    async updateComments(commentId: string, content: string, userId: string): Promise<boolean> {
        debugger
        const commentById = await this.findCommentsByID(commentId)
        if (commentById!.userId === userId) {
            const result = await CommentsCollection.updateOne({id: commentId}, {$set: {content: content}})
            return result.matchedCount === 1
        }
        return false
    },
    async deleteComment(id: string, idUser: string): Promise<boolean> {
        if (id === idUser) {
            const result = await CommentsCollection.deleteOne({id: id})
            return result.deletedCount === 1
        } else return false
    },
}