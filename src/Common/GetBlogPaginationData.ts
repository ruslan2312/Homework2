import {BlogPaginationQueryType, PostPaginationQueryType} from "./Type";

export const getBlogPaginationData = (query: any): BlogPaginationQueryType => {
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
    const sortBy = query.sortBy === "title" ? "title" : "createdAt"
    const sortDirection = query.sortDirection = "asc" ? "asc" : "desc"
    return {searchNameTerm, pageSize, pageNumber, sortBy, sortDirection}
}