import jwt from 'jsonwebtoken'
import environment from '../../common/environment.mjs'

const secret = 'CODATE_SECRET'
const algorithm = 'HS256'

export default class Token {
    static create(payload) {
        return jwt.sign(payload, secret, {
            algorithm: algorithm,
            expiresIn: environment.jwt.expiresInSeconds
        })
    }

    static verify(token) {
        return jwt.verify(token, secret, {algorithm: algorithm})
    }
}
