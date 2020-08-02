const router = require('express').Router(),
    passportMiddleware = require('../../passport'),
    validator = require('./validator');

router.post('/login', passportMiddleware.signIn, passportMiddleware.signJWT);

router.post('/register', (req, res, next) => {
    if (!validator.isValidEmail(req.body.email)) {
        return res.status(400).json({ "error": "Please provide a valid email address" });
    }

    const passwordErrors = validator.validatePassword(req.body.password);
    if (passwordErrors.length > 0) {
        return res.status(400).json({ "error": `Invalid password. ${passwordErrors.join(". ")}` });
    }

    next();
}, passportMiddleware.register, passportMiddleware.signJWT);

router.get('/validate', passportMiddleware.authenticate, (req, res) => {
    if (req.user) {
        return res.status(200).json({ user: req.user });
    }

    return res.status(401).send("Unauthorized");
});

module.exports = router;