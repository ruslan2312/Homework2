import express from "express"
import bodyParser from "body-parser";
import {BlogsRouter} from "./Router/blogs-router";
import {PostsRouter} from "./Router/posts-router";
import {allDelete} from "./Router/all-delete";

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser())
app.use('/blogs', BlogsRouter)
app.use('/posts', PostsRouter)
app.use('/testing/all-data', allDelete)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})