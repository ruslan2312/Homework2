import {BlogsCollection} from "./db";

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
        return BlogsCollection.find(filter ,{projection:{_id:0}}).toArray()
    },
    async findBlogByID(id: string): Promise<BlogsType | null> {
        let product: BlogsType | null = await BlogsCollection.findOne({id: id})
        if (product) {
            return product
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
    async createBlog(name: string, youtubeUrl: string): Promise<BlogsType> {
        const newBlog = {
            id: new Date().valueOf().toString(),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date().toISOString()
        }
        const result = await BlogsCollection.insertOne(newBlog)
        return (newBlog)
    },
    async deleteAllBlogger(): Promise<boolean> {
        const result = await BlogsCollection.deleteMany({})
        return result.deletedCount === 1
    },

}