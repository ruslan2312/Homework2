import {MongoClient} from "mongodb"
import {BlogsType} from "./blogs-repository";
import {PostsType} from "./posts-Repository";

const mongoUri = process.env.mongoURI || "mongodb+srv://146.70.108.10/32 "

const client = new MongoClient(mongoUri)


const db = client.db("Profile")
export const BlogsCollection = db.collection<BlogsType>("blogs")
export const PostsCollection = db.collection<PostsType>("posts")

export async function runDb() {
    try {
        await client.connect()
        await client.db('blogs').command({ping: 1})
    } catch {
        await client.close()
    }
}