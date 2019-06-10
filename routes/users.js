const express = require('express'),
  router = express.Router(),
  UsersControllers = require('../controllers/userController');

router.get('/login', UsersControllers.login_get);
router.post('/login', UsersControllers.login_post);

router.get('/signup', UsersControllers.signup_get);
router.post('/signup', UsersControllers.signup_post);

router.get('/profile', UsersControllers.profile_get);

router.get('/logout', UsersControllers.logout_get);

module.exports = router;

