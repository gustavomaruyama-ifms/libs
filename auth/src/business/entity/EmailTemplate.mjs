import environment from '../../common/environment.mjs'

export default class EmailTemplate {
    static createEmailForRegisterUser(userData, token) {
        const subject = 'Confirmação do seu endereço de email'
        const html = `<div>
                          <p>Olá ${userData.email}</p>
                          <p>Seja bem-vindo ao ${environment.app.name}! Para podermos confirmar o seu endereço de email, clique no link abaixo:<br>
                            <a href="http://${environment.app.domain}/auth/confirm/${token}" target="_blank">
                                http://${environment.app.domain}/auth/confirm/${token}</a>
                          </p>
                          <p>Muito Obrigado</p>
                      </div>`
        return {
            from: environment.email.from,
            to: userData.email,
            subject: subject,
            html: html,
            text: '',
            password: environment.email.password
        }
    }
}
