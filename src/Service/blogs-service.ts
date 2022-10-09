import {BlogsRepository, BlogsType} from "../Repository/blogs-repository";
import {PostsRepository, PostsType} from "../Repository/posts-repository";
import {BlogsCollection} from "../Repository/db";

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
    async createPostByBlog(blogId: string, title: string, shortDescription: string, content: string): Promise<PostsType | null> {
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
    async deleteAllBlogger(): Promise<boolean> {
        return BlogsRepository.deleteAllBlogger()
    },

}