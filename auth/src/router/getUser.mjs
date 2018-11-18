import express from 'express'
import Responder from '../common/Responder.mjs'
import GetUser from '../business/usecase/GetUser.mjs'

const router = express.Router()
router.get('/users/:email', (req, res, next) => {
    const responder = new Responder(req, res, next)
    const getUser = new GetUser()
    getUser.execute(req.params.email, responder)
})

export default router
