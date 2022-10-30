import {emailAdapter} from "../adapter/email-adapter";
import {usersRepository} from "../repository/users-repository";
import {randomUUID} from "crypto";

export const authService = {
    async resentEmail(email: string) {
        const user = await usersRepository.findByLoginOrEmail(email)
        if(user?.emailConfirmation.isConfirmed === true) return null
        const newConfirmationCode = randomUUID()
        const updateUserConfirmCodeByEmail = await usersRepository.updateUserConfirmationCodeByEmail(email, newConfirmationCode);
        if (updateUserConfirmCodeByEmail) {
            await emailAdapter.sendMail(email, "Resending", newConfirmationCode)
        } else return null

    }
}