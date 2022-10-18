import {
    BlogPaginationQueryType,
    FindPostByIdPaginationQueryType,
    UsersPaginationQueryType,
    PostPaginationQueryType
} from "./Type";

export const paginationData = (query: any): BlogPaginationQueryType => {
    const searchNameTerm = query.searchNameTerm ? query.searchNameTerm : "";
    const pageSize = isNaN(query.pageSize) ? 10 : query.pageSize;
    const pageNumber = isNaN(query.pageNumber) ? 1 : query.pageNumber;
    const sortBy = query.sortBy === "name" ? "name" : "createdAt";
    const sortDirection = query.sortDirection === "asc" ? "asc" : "desc";
    return {searchNameTerm, pageSize, pageNumber, sortBy, sortDirection}
}

export const getPostPaginationData = (query: any): PostPaginationQueryType => {
    const searchNameTerm = query.searchNameTerm ? query.searchNameTerm : "";
    const pageSize = isNaN(query.pageSize) ? 10 : query.pageSize
    const pageNumber = isNaN(query.pageNumber) ? 1 : query.pageNumber
    const sortBy = query.sortBy === "blogName" ? "blogName" : "createdAt"
    const sortDirection = query.sortDirection === "asc" ? "asc" : "desc";
    return {searchNameTerm, pageSize, pageNumber, sortBy, sortDirection}
}
export const findPostByIdTypePaginationData = (query: any): FindPostByIdPaginationQueryType => {
    const searchNameTerm = query.searchNameTerm ? query.searchNameTerm : "";
    const pageSize = isNaN(query.pageSize) ? 10 : query.pageSize;
    const pageNumber = isNaN(query.pageNumber) ? 1 : query.pageNumber;
    const blogId = query.blogId ? query.blogId : "";
    const sortBy = query.sortBy === "blogName" ? "blogName" : "createdAt";
    const sortDirection = query.sortDirection === "asc" ? "asc" : "desc";
    return {searchNameTerm, pageSize, pageNumber, blogId, sortBy, sortDirection,}
}
export const findUsersByIdTypePaginationData = (query: any): UsersPaginationQueryType => {
    const searchLoginTerm = query.searchLoginTerm ? query.searchLoginTerm : "";
    const searchEmailTerm = query.searchEmailTerm ? query.searchEmailTerm : "";
    const pageSize = isNaN(query.pageSize) ? 10 : query.pageSize;
    const pageNumber = isNaN(query.pageNumber) ? 1 : query.pageNumber;
    const sortBy = query.sortBy === "name" ? "name" : "createdAt";
    const sortDirection = query.sortDirection === "asc" ? "asc" : "desc";
    return {searchLoginTerm, searchEmailTerm, pageSize, pageNumber, sortBy, sortDirection,}
}