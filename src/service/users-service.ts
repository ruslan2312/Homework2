import {UsersPaginationQueryType, UserType} from "../types/type";
import bcrypt from 'bcrypt'
import {usersRepository} from "../repository/users-repository";

export const usersService = {
    async findUsers(query: UsersPaginationQueryType): Promise<UserType[]> {
        return await usersRepository.findUsers(query);
    },
    async findUserById(id: string): Promise<UserType | null> {
        return usersRepository.findUserById(id)
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
        return usersRepository.createUser(newUser)
    },
    async deleteUser(id: string): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    },
    async deleteAllUsers(): Promise<boolean> {
        return usersRepository.deleteAllUsers()
    },
    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash === passwordHash) {
            return user
        } else return null;
    },
    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    },
}