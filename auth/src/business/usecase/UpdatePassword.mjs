import Encryption from '../entity/Encryption.mjs'
import userRepository from '../../repository/UserRepository'

export default class UpdatePassword {
    async execute(userData, responder) {
        try {
            const matchedUser = await userRepository.findByEmail(userData.email)
            if (!matchedUser) {
                throw new Error('Email not exist')
            }
            matchedUser.password = await Encryption.hash(userData.password)
            const updatedUser = await userRepository.save(matchedUser)
            responder.success(updatedUser)
        } catch (err) {
            responder.error(err)
        }
    }
}
