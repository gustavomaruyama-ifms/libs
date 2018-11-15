export default class EmailTemplate {
    static createEmailForRegisterUser(userData, token) {
        const subject = 'Confirmação do seu endereço de email'
        const html = `<div>
                          <p>Olá ${userData.email}</p>
                          <p>Seja bem-vindo ao ${process.env.APP_NAME}! Para podermos confirmar o seu endereço de email, clique no link abaixo:<br>
                            <a href="${process.env.URL_BASE}/auth/confirm/${token}" target="_blank">
                                ${process.env.URL_BASE}/auth/confirm/${token}</a>
                          </p>
                          <p>Muito Obrigado</p>
                      </div>`
        return {
            from: process.env.EMAIL_FROM,
            to: userData.email,
            subject: subject,
            html: html,
            text: '',
            password: process.env.EMAIL_PASSWORD
        }
    }
}
