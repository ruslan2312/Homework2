import {BlogsCollection, PostsCollection} from "./db";
import {PostsType} from "./posts-repository";

export type BlogsType = {
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: string
}

export const blogs: BlogsType [] = [];


export const BlogsRepository = {
    async findBlog(name: string | null | undefined): Promise<BlogsType[]> {
        let filter: any = {}
        if (name) {
            filter.title = {$regex: name}
        }
        return BlogsCollection.find(filter, {projection: {_id: 0}}).toArray()
    },
    async findBlogByID(id: string): Promise<BlogsType | null> {
        return await BlogsCollection.findOne({id: id}, {projection: {_id: 0}});
    },
    async findBlogAndPostByID(id: string): Promise<PostsType | null> {
        let post: PostsType | null = await PostsCollection.findOne({blogId:id}, {projection: {_id: 0}})
        if (post) {
            return post
        } else {
            return null
        }
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await BlogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await BlogsCollection.updateOne({id: id}, {$set: {name: name, youtubeUrl: youtubeUrl}})
        return result.matchedCount === 1
    },
    async createBlog(newBlog: BlogsType): Promise<BlogsType> {
        const result = await BlogsCollection.insertOne({...newBlog})
        return newBlog
    },
    async deleteAllBlogger(): Promise<boolean> {
        const result = await BlogsCollection.deleteMany({})
        return result.deletedCount === 1
    },

}