import {blogs} from "./blogs-repository";

export type postsType = {
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
    bloggerName: string
}

const posts: postsType [] = [];


export const PostsRepository = {
    findPost(title: string | null | undefined) {
        if (title) {
            return posts.filter(p => p.title.indexOf(title) > -1)
        } else {
            return posts
        }
    },
    findPostByID(id: number) {
        return posts.find(p => p.id === +id)
    },
    deletePost(id: number) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === +id) {
                posts.splice(i, 1)
                return true
            }
        }
        return false
    },
    updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        let post = posts.find(p => p.id === +id)
        const blogger = blogs.find((e) => e.id === bloggerId)
        if (post && blogger) {
            posts[id] = {id, title, shortDescription, content, bloggerId, bloggerName: blogger.name}
            return true
        } else {
            return false
        }
    },
    createPost(title: string, shortDescription: string, content: string, bloggerId: number) {

        const blogger = blogs.find((e) => e.id === bloggerId)
        console.log(blogger)
        if (blogger) {
            const newPost: postsType = {
                id: +(new Date()),
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
                bloggerName: blogger.name
            }
            posts.push(newPost)
            return newPost
        }
        return null
    }
}