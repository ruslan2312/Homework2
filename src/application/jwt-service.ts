import {UserType} from "../common/type";
import jwt from 'jsonwebtoken'
import {settings} from "../settings";

export const jwtService = {
    async createJWT(user: UserType) {
        return jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: "1h"})
    },
    async getUserByIdToken(token: string) {
        debugger
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    }


}