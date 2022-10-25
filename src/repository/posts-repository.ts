import {CommentsCollection, PostsCollection} from "./db";
import {
    CommentsDbType,
    CommentsPaginationQueryType,
    CommentsType,
    PostPaginationQueryType,
    PostsType
} from "../types/type";
import {Filter} from "mongodb";

export const posts: PostsType [] = [];

export const postsRepository = {
    async findPost(queryData: PostPaginationQueryType): Promise<any> {
        let filter: any = {}
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
        return PostsCollection.findOne({id: id}, {projection: {_id: 0}})
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
    /// COMMENTS ==========================================================================================================
    async findCommentByPostId(queryData: CommentsPaginationQueryType, postId: string): Promise<any> {
            const filter: Filter<CommentsType> = {parentId: postId}
            const totalCount = await CommentsCollection.countDocuments(filter);
            const pagesCount = Number(Math.ceil(Number(totalCount) / queryData.pageSize))
            const page = Number(queryData.pageNumber)
            const pageSize = Number(queryData.pageSize)
            const items = await CommentsCollection.find(filter,
                {projection: {_id: 0, postId: 0}}).sort(queryData.sortBy, queryData.sortDirection)
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .toArray()
            return Promise.resolve({pagesCount, page, pageSize, totalCount, items,})}
    ,
    async createComment (newComment: CommentsType): Promise<boolean | null> {
        try {
            // return CommentsCollection.insertOne(newComment);
            const createdComment = await CommentsCollection.insertOne({...newComment});
            if (!createdComment) return null
            return createdComment.acknowledged
        } catch (e) {
            return null
        }
    },
}