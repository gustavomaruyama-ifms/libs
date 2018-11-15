import express from 'express'
import passport from 'passport'
import facebook from 'passport-facebook'
import UserEntity from '../business/entity/UserEntity.mjs'
import Token from '../business/entity/Token.mjs'

const options = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.URL_BASE}/api/auth/facebook/callback`,
    profileFields: ['emails', 'name', 'picture']
}

passport.use(new facebook.Strategy(options, async (accessToken, refreshToken, profile, cb) => {
    try {

        console.log('profile: ', profile)

        const email = getFirstEmail(profile.emails)
        if (!email) {
            throw new Error('Facebook nao retornou o email')
        }

        const matchedUser = await UserEntity.findByEmail(email)
        if (matchedUser) {
            return cb(null, matchedUser)
        }

        const createdUser = await createUser(email)
        return cb(null, createdUser)
    } catch (err) {
        cb(err, false)
    }
}))

passport.serializeUser(serialization)

passport.deserializeUser(serialization)

function serialization(user, done) {
    done(null, user)
}

function getFirstEmail(emails) {
    return (emails && emails[0]) ? emails[0].value : null
}

async function createUser(email) {
    const userData = {email: email, source: 'facebook'}
    const createdUser = await UserEntity.create(userData)
    return createdUser
}



/**
 * Rotas do facebook para depois que voltar do facebook a aplicação possa fazer ganha-lo um jwt token
 */

const router = express.Router()

router.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope: ['email','public_profile'] }))

router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res, next) => {
    if (req.user) {
        return successFacebookLogin(res, req.user)
    }
    errorFacebookLogin(res)
})

function successFacebookLogin(res, user) {
    const payload = {
        id: user._id,
        email: user.email,
        timestamp: new Date()
    }
    const token = Token.create(payload)
    res.redirect(`/callback?token=${token}`)
}

function errorFacebookLogin(res) {
    res.redirect('/callback?error=FACEBOOK_ERROR')
}

export default router