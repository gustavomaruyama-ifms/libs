import express from 'express'
import Responder from '../common/Responder.mjs'
import CreateFile from '../business/usecase/CreateFile.mjs'
import Interceptor from './Interceptor.mjs'

const router = express.Router()
router.post('/files', Interceptor.create(), (req, res, next) => {
    const responder = new Responder(req, res, next)
    const createFile = new CreateFile()
    createFile.execute(req.file, responder)
})

export default router
