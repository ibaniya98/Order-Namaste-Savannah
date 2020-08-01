const router = require('express').Router(),
    passportMiddleware = require('../../passport');

router.get('/', passportMiddleware.authenticate, (req, res) => {
    return res.json({ "message": "User is authenicated", user: req.user });
})

module.exports = router;