import {UsersCollection} from "./Db";
import {UserType} from "../Common/Type";

export const UsersRepository = {
    async findByLoginOrEmail(loginOrEmail: string) {
        return await UsersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]})
    },
    async findUsers(): Promise<any> {
        let filter: any = {}
        const items = await UsersCollection.find(filter, {
            projection: {
                _id: 0,
                passwordHash: 0,
                passwordSalt: 0
            }
        }).toArray();

        return Promise.resolve(items)
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