export type blogsType = {
    id: number,
    name: string,
    youtubeUrl: string
}

const blogs: blogsType [] = [];


export const BlogsRepository = {
    findBlog(name: string | null | undefined) {
        if (name) {
            return blogs.filter(p => p.name.indexOf(name) > -1)
        } else {
            return blogs
        }
    },
    findBlogByID(id: number) {
        return blogs.find(p => p.id === +id)
    },
    deleteBlog(id: number) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === +id) {
                blogs.splice(i, 1)
                return true
            }
        }
        return false
    },
    updateBlog(id: number, name: string, youtubeUrl: string) {
        let blog = blogs.find(p => p.id === +id)
        if (blog) {
            blog.name = name
            blog.youtubeUrl = youtubeUrl
            return true
        } else {
            return false
        }
    },
    createBlog(name: string, youtubeUrl: string) {
        const newBlog: blogsType = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        blogs.push(newBlog)
        return newBlog
    }
}