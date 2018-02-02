var passport = require('passport');
var express = require('express');
var router = express.Router();

var Account = require('../models/Account');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'CTM [v1.0.0]', user: req.user });
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  Account.register(new Account({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('login', {title: 'CTM [v1.0.1]', user: req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/users', function(req, res) {
  res.render('login', {title: 'CTM [v1.0.1] - Usuários', user: req.user});
});


// ++++++++++++++++++++++ Suppliers +++++++++++++++++++++++++++

router.get('/suppliers',  isLoggedIn, customer.list)
// Get single user by id
router.get('/suppliers/show/:id', isLoggedIn, customer.show)
// Create user
router.get('/suppliers/new', isLoggedIn, customer.create)
// Save user
router.post('/suppliers/save', isLoggedIn, customer.save)
// Edit user
router.get('/suppliers/edit/:id', isLoggedIn, customer.edit)
// Edit user
router.post('/suppliers/update/:id',isLoggedIn,  customer.update)
// Delete
router.post('/suppliers/delete/:id', isLoggedIn, customer.delete)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;

function isLoggedIn(req, res, next) {            
  if (req.isAuthenticated())        
      return next();

  res.redirect('/login');
}