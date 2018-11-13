import express from 'express'
import Responder from '../common/Responder.mjs'
import ConfirmEmail from '../business/usecase/ConfirmEmail.mjs'

const router = express.Router()
router.get('/auth/confirm/:token', (req, res, next) => {
    const responder = new Responder(req, res, next)
    const confirmEmail = new ConfirmEmail()
    confirmEmail.execute(req.params, responder)
})

export default router
