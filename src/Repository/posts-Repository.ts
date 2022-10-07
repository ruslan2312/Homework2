import {BlogsCollection, PostsCollection} from "./db";

export type PostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export const posts: PostsType [] = [];

export const PostsRepository = {
    async findPost(title: string | null | undefined): Promise<PostsType[]> {
        let filter: any = {}
        if (title) {
            filter.title = {$regex: title}
        }
        return PostsCollection.find(filter, {projection: {_id: 0}}).toArray()
    },
    async findPostByID(id: string): Promise<PostsType | null> {
        let post: PostsType | null = await PostsCollection.findOne({id: id}, )
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
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostsType | null> {
        debugger
        const blogger = await BlogsCollection.findOne({id: blogId})
        console.log(blogger)
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
            await PostsCollection.insertOne(newPost)
            return newPost
        }
        return null

    },
    async deleteAllPosts(): Promise<boolean> {
        const result = await PostsCollection.deleteMany({})
        return result.deletedCount === 1
    },
}