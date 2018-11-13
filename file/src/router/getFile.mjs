import express from 'express'
import Responder from '../common/Responder.mjs'
import GetFile from '../business/usecase/GetFile.mjs'

const router = express.Router()
router.get('/files/:filename', (req, res, next) => {
    const responder = new Responder(req, res, next)
    const getFile = new GetFile()
    getFile.execute(req.params.filename, false, responder)
})

router.get('/files/:filename/:download', (req, res, next) => {
    const responder = new Responder(req, res, next)
    const getFile = new GetFile()
    getFile.execute(req.params.filename, true, responder)
})

export default router
