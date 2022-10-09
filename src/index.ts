import * as dotenv from "dotenv"
import express from "express"
import {BlogsRouter} from "./Router/blogs-router";
import {PostsRouter} from "./Router/posts-router";
import {allDelete} from "./Router/all-delete";
import {runDb} from "./Repository/db";

dotenv.config()

const app = express();
const port = process.env.PORT || 3000

// app.use(bodyParser())
app.use(express.json())
app.use('/blogs', BlogsRouter)
app.use('/posts', PostsRouter)
app.use('/testing/all-data', allDelete)
const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()