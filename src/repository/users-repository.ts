import {UsersCollection} from "./db";
import {UserDbType, UserResponseType, UsersPaginationQueryType} from "../types/type";
import {Filter} from "mongodb";
import {paginationResult, PaginationResultType} from "../helpers/paginathion";


export const usersRepository = {
    async findUsers(queryData: UsersPaginationQueryType): Promise<PaginationResultType> {
        const filter = this._getFilterForQuery(queryData)
        return this._findUsersByFilters(filter, queryData)
    },
    async findByLoginOrEmail(loginOrEmail: string) {
        return await UsersCollection.findOne({$or: [{'accountData.email': loginOrEmail}, {'accountData.login': loginOrEmail}]})
    },
    async findUserById(id: string) {
        return await UsersCollection.findOne({id: id}, {projection: {_id: 0}})
    },
    async createUser(user: UserDbType): Promise<any> {
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
    _getFilterForQuery(queryData: UsersPaginationQueryType): Filter<UserDbType> {
        if (!queryData.searchEmailTerm && queryData.searchLoginTerm) {
            return {login: {$regex: queryData.searchLoginTerm, $options: 'i'}}
        }
        if (queryData.searchEmailTerm && !queryData.searchLoginTerm) {
            return {email: {$regex: queryData.searchEmailTerm, $options: 'i'}}
        }
        if (queryData.searchEmailTerm && queryData.searchLoginTerm) {
            return {
                $or: [{
                    login: {
                        $regex: queryData.searchLoginTerm, $options: 'i'
                    }
                }, {email: {$regex: queryData.searchEmailTerm, $options: 'i'}}]
            }
        }
        return {}
    },
    async updateUserConfirmationCodeByEmail(email: string, confirmationCode: string) {
        const result = await UsersCollection.updateOne({'accountData.email': email}, {$set: {'emailConfirmation.confirmationCode': confirmationCode}})
        return result.matchedCount === 1
    },

    async _findUsersByFilters(filter: Filter<UserDbType>, queryData: UsersPaginationQueryType): Promise<PaginationResultType> {
        const totalCount = await UsersCollection.countDocuments(filter)
        const page = Number(queryData.pageNumber)
        const pageSize = Number(queryData.pageSize)
        const result = await UsersCollection.find(filter, {
            projection: {
                _id: 0,
                'accountData.passwordHash': 0,
                'accountData.passwordSalt': 0,
                emailConfirmation: 0,
            },
        })
            .sort(queryData.sortBy, queryData.sortDirection)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const items = this._mapUserDbToResponse(result)
        return paginationResult(page, pageSize, totalCount, items)
    },
    _mapUserDbToResponse(users: UserDbType[]): UserResponseType[] {
        return users.map(u => ({
            id: u.id,
            login: u.accountData.login,
            email: u.accountData.email,
            createdAt: u.accountData.createdAt
        }))
    },

}
