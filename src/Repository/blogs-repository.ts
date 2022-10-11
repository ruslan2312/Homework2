import {BlogsCollection, PostsCollection} from "./db";
import {BlogsType, PaginationQueryType, PostsType} from "../Type/Type";


export const blogs: BlogsType [] = [];


export const BlogsRepository = {
    async findBlog(queryData: PaginationQueryType): Promise<BlogsType[]> {
        let filter: any = {}
        if (queryData.searchNameTerm) {
            filter.title = {$regex: queryData.searchNameTerm}
        }
        const countDocuments = await BlogsCollection.countDocuments({name: {$regex: queryData.searchNameTerm}})
        //todo pagesCount, refactoring...
        const items = BlogsCollection.find(filter, {projection: {_id: 0}})
            .sort(queryData.sortBy, queryData.sortDirection)
            .skip((queryData.pageNumber - 1) * queryData.pageSize)
            .limit(queryData.pageSize)
            .toArray()
        return items
        // return new Promise((res, rej)=>res)
        //todo
        // {
        //     pagesCount...
        //     ......
        //     items: []
        // }
    },
    async findBlogByID(id: string): Promise<BlogsType | null> {
        return await BlogsCollection.findOne({id: id}, {projection: {_id: 0}});
    },
    async findBlogAndPostByID(id: string): Promise<PostsType | null> {
        let post: PostsType | null = await PostsCollection.findOne({blogId: id}, {projection: {_id: 0}})
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
    async createPostByBlog(newPost: PostsType): Promise<PostsType> {
        const result = await PostsCollection.insertOne({...newPost})
        return newPost
    },
    async deleteAllBlogger(): Promise<boolean> {
        const result = await BlogsCollection.deleteMany({})
        return result.deletedCount === 1
    },

}