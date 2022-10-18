import {UsersCollection} from "./Db";
import {UsersPaginationQueryType, UserType} from "../Common/Type";

export const UsersRepository = {
    async findUsers(queryData: UsersPaginationQueryType): Promise<any> {
        let filter: any = {}
        debugger
        if (queryData.searchLoginTerm || queryData.searchEmailTerm) {
            filter.login = {$regex: queryData.searchLoginTerm, $options: 'i'}
            filter.email = {$regex: queryData.searchEmailTerm, $options: 'i'}
        }
        const totalCount = await UsersCollection.countDocuments({
            $or: [{login: filter.login}, {email: filter.email}],
        })
        debugger
        const pagesCount = Number(Math.ceil(totalCount / queryData.pageSize))
        const page = Number(queryData.pageNumber)
        const pageSize = Number(queryData.pageSize)
        debugger
        const items = await UsersCollection.find({$or: [{login: filter.login}, {email: filter.email}]}, {
            projection: {
                _id: 0,
                passwordHash: 0,
                passwordSalt: 0,
            },
        })
            .sort(queryData.sortBy, queryData.sortDirection)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        debugger
        return Promise.resolve({pagesCount, page, pageSize, totalCount, items,})
    },
    async findByLoginOrEmail(loginOrEmail: string) {
        return await UsersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]})
    },
    async createUser(user: UserType): Promise<any> {
        await UsersCollection.insertOne({...user});
        return Promise.resolve({...user, passwordHash: undefined, passwordSalt: undefined})
    },
    async deleteUser(id: string): Promise<boolean> {
        const result = await UsersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async deleteAllUsers(): Promise<boolean> {
        const result = await UsersCollection.deleteMany({})
        return result.deletedCount === 1
    },
}