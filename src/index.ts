import express from "express"
import bodyParser from "body-parser";
import {BlogsRouter} from "./Router/blogs-router";

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser())
app.use('/bloggers', BlogsRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})