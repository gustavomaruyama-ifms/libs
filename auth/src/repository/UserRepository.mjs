import {User} from './User.mjs'

class UserRepository {
    async save(userData) {
        const user = new User(userData)
        return user.save()
    }

    async findByEmail(email) {
        return User.findOne({email: email})
    }
}

export default new UserRepository()
