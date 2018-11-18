import userRepository from '../../repository/UserRepository'

export default class GetUser {
    async execute(email, responder) {
        try {
            const matchedUser = await userRepository.findByEmail(email)
            if (matchedUser) {
                responder.success(matchedUser)
            } else {
                const err = {message: 'USER_NOT_FOUND'}
                responder.notFound(err)
            }
        } catch (err) {
            responder.error(err)
        }
    }
}
