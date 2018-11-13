import Token from '../entity/Token.mjs'

export default class VerifyToken {
    async execute(params, responder) {
        try {
            const userData = Token.verify(params.token)
            responder.success(userData)
        } catch (err) {
            responder.error(err)
        }
    }
}
