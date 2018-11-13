import userRepository from '../../repository/UserRepository'

export default class CheckIsExist {
    async execute(userData, responder) {
        try {
            const matchedUser = await userRepository.findByEmail(userData.email)
            if (matchedUser) {
                responder.success({exist: true})
            } else {
                responder.success({exist: false})
            }
        } catch (err) {
            responder.error(err)
        }
    }
}
