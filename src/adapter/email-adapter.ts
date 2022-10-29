import nodemailer from "nodemailer";

const mailAccount = {
    user: "heeca@mail.ru",
    pass: "Lb9ZFLhPTdGFNxeH2bLE"
}
export const emailAdapter = {
    async sendMail(email: string, subject: string, message: string) {

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
        let info = await transporter.sendMail({
            from: '"GOOGLE" <heeca@mail.ru>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: message, // html body
        });

        return true
    }
}