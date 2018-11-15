import jwt from 'jsonwebtoken'

const secret = 'CODATE_SECRET'
const algorithm = 'HS256'
const expiresIn = (5 * 60 * 60)

export default class Token {
    static create(payload) {
        return jwt.sign(payload, secret, {algorithm, expiresIn})
    }

    static verify(token) {
        return jwt.verify(token, secret, {algorithm})
    }
}
