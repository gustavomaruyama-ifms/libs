import Encryption from '../entity/Encryption.mjs'
import Token from '../entity/Token.mjs'
import UserEntity from '../entity/UserEntity.mjs'
import userRepository from '../../repository/UserRepository'

export default class Login {
    async execute(userData, responder) {
        try {
            const matchedUser = await userRepository.findByEmail(userData.email)
            const passwordIsCorrect = await Encryption.compare(userData.password, matchedUser.password)
            if (!passwordIsCorrect) {
                throw new Error('Wrong password')
            }
            const payload = UserEntity.createPayload(matchedUser)
            const token = Token.create(payload)
            responder.success({token})
        } catch (err) {
            responder.unauthorized()
        }
    }
}
