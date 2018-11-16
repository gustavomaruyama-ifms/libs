import passport from 'passport'
import facebook from 'passport-facebook'

const options = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.URL_BASE}/`,
    profileFields: ['emails', 'name', 'picture']
}

function serialization(user, done) {
    done(null, user)
}

function getEmail(profile) {
    return (profile.emails && profile.emails[0]) ? profile.emails[0].value : null
}

function getPhoto(profile) {
    return (profile.photos && profile.photos[0]) ? profile.photos[0].value : null
}

function getName(profile) {
    return (profile.name) ? `${profile.name.givenName} ${profile.name.familyName}` : null
}

passport.use(new facebook.Strategy(options, async (accessToken, refreshToken, profile, cb) => {
    const userData = {
        email: getEmail(profile),
        name: getName(profile),
        photo: getPhoto(profile),
        source: 'facebook'
    }
    return cb(null, userData)
}))

passport.serializeUser(serialization)

passport.deserializeUser(serialization)
