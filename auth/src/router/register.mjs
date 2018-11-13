import express from 'express'
import Responder from '../common/Responder.mjs'
import RegisterUser from '../business/usecase/RegisterUser.mjs'

const router = express.Router()
router.post('/auth/register', (req, res, next) => {
    const responder = new Responder(req, res, next)
    const registerUser = new RegisterUser()
    registerUser.execute(req.body, responder)
})

export default router
