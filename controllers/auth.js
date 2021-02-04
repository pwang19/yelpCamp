const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('auth/register');
}

module.exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body.user;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome to Yelp Camp, ${username}!`);
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }

}

module.exports.renderLoginForm = (req, res) => {
    res.render('auth/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}!`);
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'You have successfully logged out.');
    res.redirect('/campgrounds');
}