import {BlogsType, CommentsResponseType, PostsType, UserResponseType} from "../types/type";

type PaginationItemsType = UserResponseType[] | BlogsType[] | CommentsResponseType[] | PostsType[]

export type PaginationResultType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PaginationItemsType
}

export const paginationResult = (page: number, pageSize: number, totalCount: number, items: PaginationItemsType): PaginationResultType => {
    const pagesCount = Number(Math.ceil(totalCount / pageSize))
    return {pagesCount, page, pageSize, totalCount, items}

}