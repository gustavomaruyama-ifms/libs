import _ from 'lodash'

export default class EmailCreator {
    static prepare(to, template, variables) {
        const compiled = _.template(template.content)
        const html = compiled(variables)

        return {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: template.subject,
            html: html,
            text: '',
            password: process.env.EMAIL_PASSWORD
        }
    }
}
