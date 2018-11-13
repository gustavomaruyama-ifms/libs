import Encryption from '../entity/Encryption.mjs'
import Token from '../entity/Token.mjs'
import userRepository from '../../repository/UserRepository'

export default class Login {
    async execute(userData, responder) {
        try {
            const matchedUser = await userRepository.findByEmail(userData.email)
            const passwordIsCorrect = await Encryption.compare(userData.password, matchedUser.password)
            if (!passwordIsCorrect) {
                throw new Error('Wrong password')
            }
            const payload = this.createTokenPayload(matchedUser)
            const token = Token.create(payload)
            responder.success({token})
        } catch (err) {
            responder.unauthorized()
        }
    }

    createTokenPayload(userData) {
        return {
            id: userData._id,
            email: userData.email,
            timestamp: new Date()
        }
    }
}
