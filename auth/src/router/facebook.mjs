import passport from 'passport'
import facebook from 'passport-facebook'
import UserEntity from '../business/entity/UserEntity.mjs'

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

export default passport