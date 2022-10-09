import {BlogsRepository, BlogsType} from "../Repository/blogs-repository";
import { PostsType} from "../Repository/posts-repository";

export const BlogsService = {
    async findBlog(name: string | null | undefined): Promise<BlogsType[]> {
        return BlogsRepository.findBlog(name)
    },
    async findBlogByID(id: string): Promise<BlogsType | null> {
        return BlogsRepository.findBlogByID(id)
    },
    async findBlogAndPostByID(id: string): Promise<PostsType | null> {
        return await BlogsRepository.findBlogAndPostByID(id)
    },
    async deleteBlog(id: string): Promise<boolean> {
        return await BlogsRepository.deleteBlog(id)
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await BlogsRepository.updateBlog(id, name, youtubeUrl)
    },
    async createBlog(name: string, youtubeUrl: string): Promise<BlogsType> {
        const newBlog = {
            id: new Date().valueOf().toString(),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date().toISOString()
        }
        return await BlogsRepository.createBlog(newBlog)
    },
    async deleteAllBlogger(): Promise<boolean> {
        return BlogsRepository.deleteAllBlogger()
    },

}