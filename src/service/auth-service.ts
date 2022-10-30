import {emailAdapter} from "../adapter/email-adapter";
import {usersRepository} from "../repository/users-repository";
import {randomUUID} from "crypto";

export const authService = {
    async resentEmail(email: string) {
        const newConfirmationCode = randomUUID()
        await usersRepository.updateUserConfirmationCodeByEmail(email, newConfirmationCode);
        await emailAdapter.sendMail(email, "Resending", newConfirmationCode)
    }
}