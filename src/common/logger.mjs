import bunyan from 'bunyan'

const logger = bunyan.createLogger({
    name: 'api',
    stream: process.stdout,
    level: 'info',
    src: true
})

export default logger
