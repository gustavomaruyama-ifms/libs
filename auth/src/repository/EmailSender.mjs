import nodemailer from 'nodemailer'

class EmailSender {
    async send({from, to, subject, html, text, password}) {
        return new Promise((resolve, reject) => {
            let transporter = this.createTransport(from, password)
            const email = arguments[0]
            delete email.password
            transporter.sendMail(email, (error, info) => {
                if (error) return reject(error)
                resolve(info)
            })
        })
    }

    createTransport(from, password) {
        return nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: from,
                pass: password
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }
}

const emailSender = new EmailSender()
export default emailSender
