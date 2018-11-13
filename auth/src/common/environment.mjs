import packageJson from '../../package.json'

export default {
    app: {
        name: packageJson.name,
        version: packageJson.version,
        domain: process.env.DOMAIN || 'localhost'
    },

    jwt: {
        expiresInSeconds: process.env.JWT_EXPIRES || (5 * 60 * 60)
    },

    email: {
        from: process.env.EMAIL_USER || 'noreplyfaciles@gmail.com',
        password: process.env.EMAIL_PASSWORD || 'faciles@123'
    },

    db: {
        url: process.env.DB_URL || 'mongodb://localhost/lot'
    },

    server: {
        port: process.env.PORT || 8082
    }
}
