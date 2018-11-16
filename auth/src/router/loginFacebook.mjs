import express from 'express'
import passport from 'passport'
import LoginSocial from '../business/usecase/LoginSocial.mjs'
import Responder from '../common/Responder.mjs'

const router = express.Router()
router.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope: ['email','public_profile'] }))
router.get('/auth/login/facebook', passport.authenticate('facebook'), (req, res, next) => {
    const responder = new Responder(req, res, next)
    const loginSocial = new LoginSocial()
    loginSocial.execute(req.user, responder)
})

export default router
