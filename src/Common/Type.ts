export type BlogsType = {
    id: string,
    name: string,
    youtubeUrl: string,
    createdAt: string
}
export type PostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
export type BlogPaginationQueryType = {
    searchNameTerm: string;
    pageSize: number;
    pageNumber: number;
    sortBy: string;
    sortDirection: "asc" | "desc"; //todo Enum
}
export type PostPaginationQueryType = {
    searchNameTerm: string;
    pageSize: number;
    pageNumber: number;
    sortBy: string;
    sortDirection: "asc" | "desc";
}