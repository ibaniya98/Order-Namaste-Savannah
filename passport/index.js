const passport = require('passport'),
    PassportJWT = require('passport-jwt'),
    JWT = require('jsonwebtoken'),
    User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET;
const jwtAlgorithm = 'HS256';
const jwtExpiresIn = 2 * 60 * 60;

passport.use(User.createStrategy());

const strategySettings = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: [jwtAlgorithm]
}

passport.use(new PassportJWT.Strategy(strategySettings, (jwt_payload, done) => {
    User.findById(jwt_payload.sub)
        .then(user => {
            if (user) { return done(null, user); }
            return done(null, false);
        })
        .catch(err => {
            return done(err, false);
        })
}));

const register = (req, res, next) => {
    const user = new User({
        email: req.body.email
    });

    User.register(user, req.body.password, (err, user) => {
        if (err) {
            if (err.name === "UserExistsError") {
                return res.status(400).json({ "error": "This email has already been taken" });
            }

            return res.status(500).json({ "error": err.message });
        }
        req.user = user;
        next();
    });
}

const signIn = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ "message": "Failed to login" });
        }
        if (!user) {
            return res.status(500).json({ "message": "Invalid credentials" });
        }
        req.user = user;
        next();
    })(req, res, next);
};

const authenticate = (req, res, next) => passport.authenticate('jwt', { session: false })(req, res, next);

const signJWT = (req, res) => {
    const user = req.user;
    const tokenOptions = {
        algorithm: jwtAlgorithm,
        expiresIn: jwtExpiresIn,
        subject: user._id.toString()
    };
    const token = JWT.sign({ email: user.email }, jwtSecret, tokenOptions);
    return res.status(200).json({
        token,
        user: {
            id: user._id,
            email: user.email
        }
    });
}

module.exports = {
    passport, register, signIn, authenticate, signJWT
}