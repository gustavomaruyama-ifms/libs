import Token from '../entity/Token.mjs'
import EmailCreator from '../entity/EmailCreator.mjs'
import templateRepository from '../../repository/TemplateRepository.mjs'
import userRepository from '../../repository/UserRepository.mjs'
import emailSender from '../../repository/EmailSender.mjs'

const TEMPLATE_NAME = 'REGISTER_EMAIL'

export default class RegisterUser {
    async execute(userData, responder) {
        try {
            await this.checkUserExist(userData)
            const token = Token.create(userData)
            const template = await templateRepository.findByName(TEMPLATE_NAME)
            const email = EmailCreator.prepare(userData.email, template, {userData, token, process})
            await emailSender.send(email)
            responder.success({success: true})
        } catch (err) {
            responder.error(err)
        }
    }

    async checkUserExist(userData) {
        const matchedUser = await userRepository.findByEmail(userData.email)
        if (matchedUser) {
            throw new Error('This email was registered before')
        }
    }
}
