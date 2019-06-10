const bcrypt = require('bcryptjs');

const Users = require('../models/user');

exports.signup_get = (req, res) => {
    res.render('template', {
        locals: {
            title: 'User Signup',
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            partial: 'partial-signup-form'
        }
    });
}

exports.login_get = (req, res) => {
    res.render('template', {
        locals: {
            title: 'Login Page',
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            partial: 'partial-login-form'
        }
    });
}

exports.profile_get = async (req, res) => {
    const u_id = req.session.user_id;
    const userInstance = new Users(u_id, null, null, null, null);
    const userInfo = await userInstance.getProfile();
    res.render('template', {
        locals: {
            title: 'User Profile',
            userData: userInfo,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-user-profile'
        }
    });
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.login_post = (req, res) => {
    const {email, password } = req.body;

    const userInstance = new Users(null, null, null, email, password);

    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        if (!!response.isValid) {
            req.session.first_name = response.first_name;
            req.session.last_name = response.last_name;
            req.session.user_id = response.user_id;
            res.redirect('/');
        } else {
            res.sendStatus(401);
        }
    });
}

exports.signup_post = (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    //salt and hash our password
    const salt = bcrypt.genSaltSync(10); //generates random characters to add to our password
    const hash = bcrypt.hashSync(password, salt); //this generates a hash based on the password and the salt 

    //create new user instance, with sign up info
    const userInstance = new Users(null, first_name, last_name, email, hash);

    userInstance.save().then(response => {
        console.log("response is", response);
        res.sendStatus(200);
    });
}