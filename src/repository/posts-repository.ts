import {PostsCollection} from "./db";
import {PostPaginationQueryType, PostsType} from "../types/type";

export const posts: PostsType [] = [];

export const postsRepository = {
    async findPost(queryData: PostPaginationQueryType): Promise<any> {
        let filter: any = {}
        debugger
        if (queryData.searchNameTerm) {
            filter.title = {$regex: queryData.searchNameTerm, $options: 'i'}
        }
        const totalCount = await PostsCollection.countDocuments({
            title: {
                $regex: queryData.searchNameTerm,
                $options: 'i'
            }
        })
        const pagesCount = Number(Math.ceil(totalCount / queryData.pageSize))
        const page = Number(queryData.pageNumber)
        const pageSize = Number(queryData.pageSize)
        const items = await PostsCollection.find(filter, {projection: {_id: 0}})
            .sort(queryData.sortBy, queryData.sortDirection)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        return Promise.resolve({pagesCount, page, pageSize, totalCount, items,})
    },
    async findPostByID(id: string): Promise<PostsType | null> {
        let post: PostsType | null = await PostsCollection.findOne({id: id}, {projection: {_id: 0}})
        if (post) {
            return post
        } else {
            return null
        }
    },
    async deletePost(id: string): Promise<boolean> {
        const result = await PostsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await PostsCollection.updateOne({id: id}, {
            $set: {
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId
            }
        })
        return result.matchedCount === 1
    },
    async createPost(newPost: PostsType): Promise<PostsType> {
        await PostsCollection.insertOne({...newPost});
        return newPost
    },
    async deleteAllPosts(): Promise<boolean> {
        const result = await PostsCollection.deleteMany({})
        return result.deletedCount === 1
    },
}