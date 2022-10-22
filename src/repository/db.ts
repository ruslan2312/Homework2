import {MongoClient} from "mongodb"
import {PostsType, BlogsType, UserType,FeedbackType} from "../types/type";
import {settings} from "../settings";

const mongoUri = settings.MONGO_URI

const client = new MongoClient(mongoUri)

const db = client.db("Profile")
export const FeedbackCollection = db.collection<FeedbackType>("feedback")
export const BlogsCollection = db.collection<BlogsType>("blogs")
export const PostsCollection = db.collection<PostsType>("posts")
export const UsersCollection = db.collection<UserType>("users")

export async function runDb() {
    try {
        await client.connect()
        await client.db('blogs').command({ping: 1})
    } catch {
        await client.close()
    }
}