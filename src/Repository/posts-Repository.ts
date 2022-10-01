import {blogs} from "./blogs-repository";

export type postsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

export const posts: postsType [] = [];

export const PostsRepository = {
    findPost(title: string | null | undefined) {
        if (title) {
            return posts.filter(p => p.title.indexOf(title) > -1)
        } else {
            return posts
        }
    },
    findPostByID(id: string) {
        return posts.find(p => p.id === id)
    },
    deletePost(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        }
        return false
    },
    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        let postIndex = posts.findIndex((e) => e.id === id)
        debugger
        if (postIndex != -1) {
            posts[postIndex].title = title
            posts[postIndex].shortDescription = shortDescription
            posts[postIndex].content = content
            posts[postIndex].blogId = blogId
            return true
        } else {
            return false
        }
    },
    createPost(title: string, shortDescription: string, content: string, blogId: string) {
        const blogger = blogs.find((e) => e.id === blogId)
        console.log(blogger)
        if (blogger) {
            const newPost: postsType = {
                id: new Date().toISOString(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blogger.name
            }
            posts.push(newPost)
            return newPost
        }
        return null

    }
}