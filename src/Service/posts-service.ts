import {PostsRepository} from "../Repository/posts-repository";
import {BlogsCollection} from "../Repository/db";
import {PostsType} from "../Common/Type";

export const PostsService = {
    async findPost(title: string | null | undefined): Promise<PostsType[]> {
        return PostsRepository.findPost(title)
    },
    async findPostByID(id: string): Promise<PostsType | null> {
        return PostsRepository.findPostByID(id)
    },
    async deletePost(id: string): Promise<boolean> {
        return await PostsRepository.deletePost(id)
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        return await PostsRepository.updatePost(id, title, shortDescription, content, blogId)
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
            return await PostsRepository.createPost(newPost)
        }
        return null
    },
    async deleteAllPosts(): Promise<boolean> {
        return PostsRepository.deleteAllPosts()
    },
}