import packageJson from '../../package.json'

export default {
    app: {
        name: packageJson.name,
        version: packageJson.version
    },
    db: {
        url: process.env.DB_URL || 'mongodb://localhost/files'
    },
    server: {
        port: process.env.PORT || 8081
    },
    file: {
        maxSize: process.env.MAX_SIZE_IN_BYTES || 50 * 1024 * 1024 // 20mb
    }
}
