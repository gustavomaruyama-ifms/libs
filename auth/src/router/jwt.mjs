import passport from 'passport'
import jwt from 'passport-jwt'

const opts = {
    secretOrKey: 'CODATE_SECRET',
    jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(new jwt.Strategy(opts, (payload, done) => {
    return done(null, {
        id: payload.id,
        email: payload.email
    })
}))

export default passport