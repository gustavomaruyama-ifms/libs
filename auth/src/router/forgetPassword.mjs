import express from 'express'
import Responder from '../common/Responder.mjs'
import ForgetPassword from '../business/usecase/ForgetPassword.mjs'

const router = express.Router()
router.put('/auth/forgetpassword/:email', (req, res, next) => {
    const responder = new Responder(req, res, next)
    const forgetPassword = new ForgetPassword()
    forgetPassword.execute(req.params.email, responder)
})

export default router
