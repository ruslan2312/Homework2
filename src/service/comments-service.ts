import {commentsRepository} from "../repository/comments-repository";
import {CommentsResponseType, CommentsType} from "../types/type";
import {postsService} from "./posts-service";

export const commentsService = {
    async findCommentsByID(id: string): Promise<CommentsResponseType | null> {
        const comment = await commentsRepository.findCommentsByID(id)
        if (!comment) return null
        return postsService.transformDbTypeToResponseTypeForFindOne(comment)
    },
    async updateComment(commentId: string, content: string, userId: string): Promise<boolean | null> {
        return commentsRepository.updateComments(commentId, content, userId)
    },
    async deleteComment(id: string, idUser: string): Promise<boolean | null> {
        return commentsRepository.deleteComment(id, idUser)
    },
    async deleteAllComments() {
        return commentsRepository.deleteAllComments()
    }


}


