const express = require('express'),
  bcrypt = require('bcryptjs'),
  router = express.Router();

const User = require('../models/user');
const UsersControllers = require('../controllers/userController');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('template', {
    locals: {
        title: 'User Page',
        is_logged_in: req.session.is_logged_in,
    },
    partials: {
        partial: 'partial-users'
    }
  });
});

router.get('/login', UsersControllers.login_get);

router.get('/signup', UsersControllers.signup_get);

router.get('/profile', async (req, res, next) => {
  const u_id = req.session.user_id;
  const userInstance = new User(u_id, null, null, null, null);
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
})

router.post('/login', (req, res) => {
  const {email, password } = req.body;

  const userInstance = new User(null, null, null, email, password);
  
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
});

router.post('/signup', (req,res) => {
  const { first_name, last_name, email, password } = req.body;
  
  //salt and hash our password
  const salt = bcrypt.genSaltSync(10); //generates random characters to add to our password
  const hash = bcrypt.hashSync(password, salt); //this generates a hash based on the password and the salt 

  //create new user instance, with sign up info
  const userInstance = new User(null, first_name, last_name, email, hash);
  
  userInstance.save().then(response => {
    console.log("response is", response);
    res.sendStatus(200);
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
