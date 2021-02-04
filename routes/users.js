const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../utils/middleware');
const passport = require('passport');
const auth = require('../controllers/auth');

router.route('/register')
    .get(auth.renderRegisterForm)
    .post(wrapAsync(auth.registerUser));

router.route('/login')
    .get(auth.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), auth.loginUser);

router.get('/logout', auth.logoutUser);

module.exports = router;