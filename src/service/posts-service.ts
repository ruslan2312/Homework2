import {postsRepository} from "../repository/posts-repository";
import {BlogsCollection} from "../repository/db";
import {CommentsPaginationQueryType, CommentsType, PostPaginationQueryType, PostsType, UserType} from "../types/type";

export const postsService = {
    async findPost(query: PostPaginationQueryType): Promise<PostsType[]> {
        return postsRepository.findPost(query)
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
/// COMMENTS ==========================================================================================================
    async findCommentsByPostId(queryData: CommentsPaginationQueryType, postId: string | null): Promise<CommentsType | null> {
        if (postId) {
            return await postsRepository.findCommentByPostId(queryData, postId)
        } else return null
    },
    async createCommentsById(content: string, postId: string, user: UserType): Promise<CommentsType | null> {
        const post = await postsRepository.findPostByID(postId)
        const id = new Date().valueOf().toString()
        if (post) {
            const newComment = {
                id,
                content: content,
                userId: user.id,
                userLogin: user.login,
                parentId: postId,
                createdAt: new Date().toISOString()
            }
            await postsRepository.createCommentsById({...newComment})
            return newComment
        } else return null
//// Рпи создании Комента мы запихиваем туда PostId и потом ищем по нему же
    }
}
















