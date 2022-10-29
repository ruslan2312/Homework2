import {UsersCollection} from "./db";
import {UsersPaginationQueryType, UserType} from "../types/type";
import {Filter} from "mongodb";


export const usersRepository = {
    async findUsers(queryData: UsersPaginationQueryType): Promise<any> {
        if (!queryData.searchLoginTerm && !queryData.searchEmailTerm) {
            return await this._findUsersByFilters({}, queryData)
        }
        if (!queryData.searchEmailTerm && queryData.searchLoginTerm) {
            return await this._findUsersByFilters({
                login: {
                    $regex: queryData.searchLoginTerm,
                    $options: 'i'
                }
            }, queryData)
        }
        if (queryData.searchEmailTerm && !queryData.searchLoginTerm) {
            return await this._findUsersByFilters({
                email: {
                    $regex: queryData.searchEmailTerm,
                    $options: 'i'
                }
            }, queryData)
        }
        if (queryData.searchEmailTerm && queryData.searchLoginTerm) {
            const filterWithOr = {
                $or: [
                    {
                        login: {
                            $regex: queryData.searchLoginTerm,
                            $options: 'i'
                        }
                    }, {email: {$regex: queryData.searchEmailTerm, $options: 'i'}}
                ]
            }
            return await this._findUsersByFilters(filterWithOr, queryData)
        }
    },
    async findByLoginOrEmail(loginOrEmail: string) {
        return await UsersCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})
    },
    async findUserById(id: string) {
        return await UsersCollection.findOne({id: id}, {projection: {_id: 0}})
    },
    async createUser(user: UserType): Promise<any> {
        await UsersCollection.insertOne({...user});
        return user
    },
    async deleteUser(id: string): Promise<boolean> {
        const result = await UsersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async deleteAllUsers(): Promise<boolean> {
        const result = await UsersCollection.deleteMany({})
        return result.deletedCount === 1
    },
    _getFilterForQuery(queryData: UsersPaginationQueryType): Filter<UserType> {
        // if (!queryData.searchLoginTerm && !queryData.searchEmailTerm) {
        //     return {}
        // }
        if (!queryData.searchEmailTerm && queryData.searchLoginTerm) {
            return {login: {$regex: queryData.searchLoginTerm, $options: 'i'}}
        }
        if (queryData.searchEmailTerm && !queryData.searchLoginTerm) {
            return {email: {$regex: queryData.searchEmailTerm, $options: 'i'}}
        }
        if (queryData.searchEmailTerm && queryData.searchLoginTerm) {
            return {
                $or: [
                    {
                        login: {
                            $regex: queryData.searchLoginTerm,
                            $options: 'i'
                        }
                    }, {email: {$regex: queryData.searchEmailTerm, $options: 'i'}}
                ]
            }
        }
        return {}
    },
    async _findUsersByFilters(filter: Filter<UserType>, queryData: UsersPaginationQueryType) {
        const totalCount = await UsersCollection.countDocuments(filter)
        const pagesCount = Number(Math.ceil(totalCount / queryData.pageSize))
        const page = Number(queryData.pageNumber)
        const pageSize = Number(queryData.pageSize)
        const items = await UsersCollection.find(filter, {projection: {_id: 0, passwordHash: 0, passwordSalt: 0,},})
            .sort(queryData.sortBy, queryData.sortDirection)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        return Promise.resolve({pagesCount, page, pageSize, totalCount, items})
    }
}