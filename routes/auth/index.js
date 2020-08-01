const router = require('express').Router(),
    passportMiddleware = require('../../passport'),
    validator = require('./validator');

router.post('/login', passportMiddleware.signIn, passportMiddleware.signJWT);

router.post('/register', (req, res, next) => {
    if (!validator.isValidEmail(req.body.email)) {
        return res.status(400).json({ "message": "Please provide a valid email address" });
    }

    const passwordErrors = validator.validatePassword(req.body.password);
    if (passwordErrors.length > 0) {
        return res.status(400).json({ "message": "Invalid password", errors: passwordErrors });
    }

    next();
}, passportMiddleware.register, passportMiddleware.signJWT);

module.exports = router;