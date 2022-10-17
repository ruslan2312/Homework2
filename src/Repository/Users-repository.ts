import {UsersCollection} from "./Db";
import {UserType} from "../Common/Type";

export const UsersRepository = {

    async createUser(user: UserType): Promise<UserType> {
        const result = await UsersCollection.insertOne(user)
        return user
    },
    async findByLoginOrEmail(loginOrEmail: string) {
        return await UsersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]})
    },
    async deleteAllUsers(): Promise<boolean> {
        const result = await UsersCollection.deleteMany({})
        return result.deletedCount === 1
    },
}