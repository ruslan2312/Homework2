import {postsRepository} from "../repository/posts-repository";
import {BlogsCollection} from "../repository/db";
import {
    PostPaginationQueryType,
    PostsType,
} from "../types/type";

// const transformCommentDbTypeToCommentResponseType = (comment: CommentsType, user: UserType) => {
//     return {
//         id: comment.id,
//         content: comment.content,
//         userId: user.id,
//         userLogin: user.login,
//         createdAt: comment.createdAt
//     }
// }

export const postsService = {
    async findPosts(query: PostPaginationQueryType): Promise<PostsType[]> {
        return await postsRepository.findPost(query)
    },
    async findPostByID(id: string): Promise<PostsType | null> {
        return postsRepository.findPostByID(id)
    },
    async deletePost(id: string): Promise<boolean> {
        return await postsRepository.deletePost(id)
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        return await postsRepository.updatePost(id, title, shortDescription, content, blogId)
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostsType | null> {
        const blogger = await BlogsCollection.findOne({id: blogId})
        if (blogger) {
            const newPost: PostsType = {
                id: new Date().valueOf().toString(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blogger.name,
                createdAt: new Date().toISOString()
            }
            return await postsRepository.createPost(newPost)
        }
        return null
    },
    async deleteAllPosts(): Promise<boolean> {
        return postsRepository.deleteAllPosts()
    },

}
