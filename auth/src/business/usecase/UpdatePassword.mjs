import Encryption from '../entity/Encryption.mjs'
import userRepository from '../../repository/UserRepository'
import UserEntity from '../entity/UserEntity.mjs'
import Token from '../entity/Token.mjs'

export default class UpdatePassword {
    async execute(userData, responder) {
        try {
            const matchedUser = await userRepository.findByEmail(userData.email)
            if (!matchedUser) {
                throw new Error('Email not exist')
            }
            matchedUser.password = await Encryption.hash(userData.password)
            const updatedUser = await userRepository.save(matchedUser)
            const payload = UserEntity.createPayload(updatedUser)
            const token = Token.create(payload)
            responder.success({token, payload})
        } catch (err) {
            responder.error(err)
        }
    }
}
