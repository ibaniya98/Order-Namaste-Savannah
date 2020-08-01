const router = require('express').Router(),
    authRoutes = require('./auth'),
    userRoutes = require('./user');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;