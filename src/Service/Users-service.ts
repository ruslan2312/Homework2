import {UserType} from "../Common/Type";
import bcrypt from 'bcrypt'
import {UsersRepository} from "../Repository/Users-repository";

export const UsersService = {
    async findUser() {

    },
    async createUser(login: string, email: string, password: string): Promise<UserType> {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await this._generateHash(password, passwordSalt)
        const newUser: UserType = {
            id: new Date().valueOf().toString(),
            login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }
        return UsersRepository.createUser(newUser)
    },
    async deleteUser() {
        return 'deleteUser'
    },
    async deleteAllUsers() {
        await UsersRepository.deleteAllUsers()
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await UsersRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return false
        }
    },
    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    }
}