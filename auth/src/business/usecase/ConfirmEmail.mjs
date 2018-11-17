import Token from '../entity/Token.mjs'
import Encryption from '../entity/Encryption.mjs'
import userRepository from '../../repository/UserRepository.mjs'
import UserEntity from '../entity/UserEntity.mjs'

export default class ConfirmEmail {
    async execute(params, responder) {
        try {
            const userData = Token.verify(params.token)
            await this.checkUserExist(userData)
            const cryptoPassword = await Encryption.hash(userData.password)
            const userDataToSave = {name: userData.name, email: userData.email, password: cryptoPassword, source: 'internal'}
            const savedUser = await userRepository.save(userDataToSave)
            const payload = UserEntity.createPayload(savedUser)
            const token = Token.create(payload)
            responder.success({token, payload})
        } catch (err) {
            responder.error(err)
        }
    }

    async checkUserExist(userData) {
        const matchedUser = await userRepository.findByEmail(userData.email)
        if (matchedUser) {
            throw new Error('EMAIL_NOT_EXISTS')
        }
    }
}
