import {ObjectId} from "mongodb";

export type BlogsType = {
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: string;
}
export type PostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string;
}
export type BlogPaginationQueryType = {
    searchNameTerm: string,
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: "asc" | "desc"; //todo Enum
}
export type PostPaginationQueryType = {
    searchNameTerm: string,
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: "asc" | "desc";
}

export type FindPostByIdPaginationQueryType = {
    blogId: string,
    searchNameTerm: string,
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: "asc" | "desc";
}
export type UsersPaginationQueryType = {
    searchLoginTerm: string,
    searchEmailTerm: string,
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: "asc" | "desc";
}
export type UserType = {
    id: string,
    login: string,
    email: string,
    createdAt: string,
    passwordHash: string,
    passwordSalt: string,
}

export type UserDbType = {
    id: string
    accountData: {
        login: string,
        email: string,
        passwordHash: string,
        passwordSalt: string,
        createdAt: string,
    },
    emailConfirmation: {
        confirmationCode: any,
        expirationData: Date,
        isConfirmed: boolean,
    }
}
export type UserResponseType = {
    id: string,
    login: string,
    email: string,
    createdAt: string,
}

export type CommentsResponseType = {
    id: string,
    content: string,
    userId: string,
    userLogin: string,
    createdAt: string
}


export type CommentsType = {
    id: string,
    parentId: string
    content: string,
    userId: string,
    userLogin: string,
    createdAt: string
}

export type CommentsDbType = {
    _id: ObjectId
    id: string,
    parentId: string //parentId
    content: string,
    userId: string,
    userLogin: string,
    createdAt: string
}

export type  CommentsPaginationQueryType = {
    content?: string
    postId: string,
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: "asc" | "desc";
}