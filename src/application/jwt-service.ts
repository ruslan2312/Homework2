import {UserDbType} from "../types/type";
import jwt from 'jsonwebtoken'
import {settings} from "../settings";

export const jwtService = {
    async createJWT(user: UserDbType) {
        return jwt.sign({id: user.id}, settings.JWT_SECRET, {expiresIn: "1h"})
    },
    async getUserByIdToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.id
        } catch (error) {
            return null
        }
    }


}