export type postsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: string,
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
    updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string) {
        let post = posts.find(p => p.id === id)
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.bloggerId = bloggerId
            return true
        } else {
            return false
        }
    },
    createPost(title: string, shortDescription: string, content: string, bloggerId: string) {
        const newPost: postsType = {
            id: new Date().toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: 's'
        }
        posts.push(newPost)
        return newPost
    }
}