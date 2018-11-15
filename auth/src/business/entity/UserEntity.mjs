import userRepository from '../../repository/UserRepository'

export default class UserEntity {

    async findByEmail(email) {
        const matchedUser = await userRepository.findByEmail(email)
        return matchedUser
    }

    async create(userData){
        const savedUser = await userRepository.save(userData)
        return savedUser
    }

}
