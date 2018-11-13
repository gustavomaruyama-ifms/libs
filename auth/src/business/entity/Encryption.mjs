import bcrypt from 'bcrypt'

export default class Encryption {
    static async hash(plainText) {
        const SALT_WORK_FACTOR = 10
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
                if (err) return reject(err)
                bcrypt.hash(plainText, salt, (err, hash) => {
                    if (err) return reject(err)
                    resolve(hash)
                })
            })
        })
    }

    static async compare(plainText, encryptedText) {
        return bcrypt.compare(plainText, encryptedText)
    }
}
