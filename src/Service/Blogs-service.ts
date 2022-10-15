import {BlogsRepository} from "../Repository/Blogs-repository";
import {PostsRepository} from "../Repository/Posts-repository";
import {BlogsCollection} from "../Repository/Db";
import {PostsType, BlogsType, BlogPaginationQueryType, FindPostByIdPaginationQueryType} from "../Common/Type";

export const BlogsService = {
    async findBlog(query: BlogPaginationQueryType): Promise<BlogsType[]> {
        return BlogsRepository.findBlog(query)
    },
    async findBlogByID(id: string): Promise<BlogsType | null> {
        return BlogsRepository.findBlogByID(id)
    },
    async findBlogAndPostByID(query: FindPostByIdPaginationQueryType, blogId: string): Promise<PostsType[] | any> {
        return await BlogsRepository.findBlogAndPostByID(query,blogId)
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
        debugger
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