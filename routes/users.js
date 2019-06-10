const express = require('express'),
  router = express.Router(),
  UsersControllers = require('../controllers/userController');

router.get('/login', UsersControllers.login_get);

router.get('/signup', UsersControllers.signup_get);

router.get('/profile', UsersControllers.profile_get);

router.post('/login', UsersControllers.login_post);

router.post('/signup', UsersControllers.signup_post);

router.get('/logout', UsersControllers.logout);

module.exports = router;

