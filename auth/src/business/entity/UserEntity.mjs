import userRepository from '../../repository/UserRepository'

export default class UserEntity {

    static async findByEmail(email) {
        const matchedUser = await userRepository.findByEmail(email)
        return matchedUser
    }

    static async create(userData){
        const savedUser = await userRepository.save(userData)
        return savedUser
    }

    static createPayload(userData) {
        return {
            id: userData._id,
            name: userData.name,
            email: userData.email,
            photo: userData.photo,
            source: userData.source,
            timestamp: new Date()
        }
    }
}
