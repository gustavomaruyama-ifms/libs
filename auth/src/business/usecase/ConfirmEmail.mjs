import Token from '../entity/Token.mjs'
import Encryption from '../entity/Encryption.mjs'
import userRepository from '../../repository/UserRepository'

export default class ConfirmEmail {
    async execute(params, responder) {
        try {
            const userData = Token.verify(params.token)
            await this.checkUserExist(userData)
            const cryptoPassword = await Encryption.hash(userData.password)
            const userDataToSave = {email: userData.email, password: cryptoPassword}
            const savedUser = await userRepository.save(userDataToSave)
            responder.success(savedUser)
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
