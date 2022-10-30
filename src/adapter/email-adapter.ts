import nodemailer from "nodemailer";

const mailAccount = {
    user: "heeca@mail.ru",
    pass: "Lb9ZFLhPTdGFNxeH2bLE"
}
export const emailAdapter = {
    async sendMail(email: string, subject: string, confirmationCode: string) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: mailAccount.user, // generated ethereal user
                pass: mailAccount.pass, // generated ethereal password
            },
        });
        // send mail with defined transport object
        await transporter.sendMail({
            from: '"RUSEL" <heeca@mail.ru>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: `<a href='https://somesite.com/confirm-email?code=${confirmationCode}'>complete registration</a>`,  // html body
        });
        return true
    }
}