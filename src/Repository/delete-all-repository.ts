import {blogs} from "./blogs-repository";
import {posts} from "./posts-Repository";

export const deleteAllRepository = {
    deleteAllBlogger() {
        for (let i = 0; i < blogs.length; i++) {
            blogs.splice(i, 1);
        }
        return true
    },
    deleteAllPosts() {
        for (let i = 0; i < posts.length; i++) {
            posts.splice(i, 1);
        }
        return true
    }
}
