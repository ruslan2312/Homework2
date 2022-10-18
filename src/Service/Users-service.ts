import {UsersPaginationQueryType, UserType} from "../Common/Type";
import bcrypt from 'bcrypt'
import {UsersRepository} from "../Repository/Users-repository";

export const UsersService = {
    async findUsers(query: UsersPaginationQueryType): Promise<UserType[]> {
        return await UsersRepository.findUsers(query);
    },
    async createUser(login: string, email: string, password: string): Promise<UserType> {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await this._generateHash(password, passwordSalt)
        const newUser: UserType = {
            id: new Date().valueOf().toString(),
            login: login,
            email: email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }
        return UsersRepository.createUser(newUser)
    },
    async deleteUser(id: string): Promise<boolean> {
        return await UsersRepository.deleteUser(id)
    },
    async deleteAllUsers(): Promise<boolean> {
        return UsersRepository.deleteAllUsers()
    },
    async checkCredentials(loginOrEmail: string, password: string) {
        debugger
        const user = await UsersRepository.findByLoginOrEmail(loginOrEmail)
        debugger
        if (!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        debugger
        return user.passwordHash === passwordHash;


    },
    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    },
}