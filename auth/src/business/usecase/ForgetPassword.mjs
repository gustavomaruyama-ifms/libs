import Encryption from '../entity/Encryption.mjs'
import UserEntity from '../entity/UserEntity.mjs'
import Token from '../entity/Token.mjs'
import EmailCreator from '../entity/EmailCreator.mjs'
import emailSender from '../../repository/EmailSender.mjs'
import templateRepository from '../../repository/TemplateRepository.mjs'
import userRepository from '../../repository/UserRepository.mjs'

const TEMPLATE_NAME = 'FORGET_PASSWORD'

export default class ForgetPassword {
    async execute(email, responder) {
        try {
            const userData = await userRepository.findByEmail(email)
            if (userData) {
                throw new Error('This email was registered before')
            }
            const token = Token.create({email})
            const template = await templateRepository.findByName(TEMPLATE_NAME)
            const emailData = EmailCreator.prepare(userData.email, template, {userData, token, process})
            await emailSender.send(emailData)
            responder.success({success: true})
        } catch (err) {
            responder.error(err)
        }
    }
}
