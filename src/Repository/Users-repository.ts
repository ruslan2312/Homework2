import {UsersCollection} from "./Db";
import {UserType} from "../Common/Type";

export const UsersRepository = {

    async createUser(user: UserType): Promise<any> {
        const result = await UsersCollection.insertOne({...user})
        return Promise.resolve({...user, passwordHash: undefined, passwordSalt: undefined})

    },
    async findByLoginOrEmail(loginOrEmail: string) {
        return await UsersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]})
    },
    async deleteAllUsers(): Promise<boolean> {
        const result = await UsersCollection.deleteMany({})
        return result.deletedCount === 1
    },

    async findUsers(): Promise<any> {
        let filter: any = {}
        const items = await UsersCollection.find(filter, {projection: {_id: 0}}).toArray();

        return Promise.resolve(items)
    },
}