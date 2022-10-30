import {emailAdapter} from "../adapter/email-adapter";
import {usersRepository} from "../repository/users-repository";
import {randomUUID} from "crypto";

export const authService = {
    async resentEmail(email: string) {
        const newConfirmationCode = randomUUID()
        const updateUserConfirmCodeByEmail = await usersRepository.updateUserConfirmationCodeByEmail(email, newConfirmationCode);
        if (updateUserConfirmCodeByEmail) {
            return await emailAdapter.sendMail(email, "Resending", newConfirmationCode)
        } else return null
    },
    async registrationConfirm(code: string) {
        const updateIsConfirmed = await usersRepository.updateCheckConfirmCode(code)
        if (updateIsConfirmed) {
            return true
        } else return null
    }
}