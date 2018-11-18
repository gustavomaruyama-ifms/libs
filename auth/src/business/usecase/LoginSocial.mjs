import Token from '../entity/Token.mjs'
import UserEntity from '../entity/UserEntity.mjs'
import userRepository from '../../repository/UserRepository'

export default class LoginSocial {
    async execute(userData, responder) {
        try {
            let matchedUser = await userRepository.findByEmail(userData.email)
            if (!matchedUser) {
                const userDataToSave = {name: userData.name, email: userData.email, source: userData.source}
                matchedUser = await userRepository.save(userDataToSave)
            }
            const payload = UserEntity.createPayload(matchedUser)
            const token = Token.create(payload)
            responder.success({token, payload})
        } catch (err) {
            responder.unauthorized(err)
        }
    }
}
