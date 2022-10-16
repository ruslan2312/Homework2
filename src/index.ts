import * as dotenv from "dotenv"
import express from "express"
import {BlogsRouter} from "./Router/Blogs-router";
import {PostsRouter} from "./Router/Posts-router";
import {allDelete} from "./Router/All-delete";
import {runDb} from "./Repository/Db";
import {UsersRouter} from "./Router/Users-router";

dotenv.config()

const app = express();
const port = process.env.PORT || 3000

// app.use(bodyParser())
app.use(express.json())
app.use('/blogs', BlogsRouter)
app.use('/posts', PostsRouter)
app.use('/users', UsersRouter)
app.use('/testing/all-data', allDelete)
const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()