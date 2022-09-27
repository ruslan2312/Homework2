import express from "express"
import bodyParser from "body-parser";
import {BlogsRouter} from "./Router/blogs-router";
import {PostsRouter} from "./Router/posts-router";
import {mwBasicAuth} from "./Middleware/authorization-middleware";
import basicAuth from "express-basic-auth";

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser())
app.use('/bloggers', BlogsRouter)
app.use('/posts', PostsRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})