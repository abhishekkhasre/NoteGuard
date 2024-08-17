const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const { loginSubmit, signupSubmit } = require('../controllers/passwordAuthController');
const passwordController = require('../controllers/passwordController');
const checkPasswordAuth = require('../middleware/checkPasswordAuth');
const forgetPasswordController = require('../controllers/forget_passwordController');


/**
 * Password Manager Authentication Routes 
*/


// Login form route
router.get('/password/login',isLoggedIn, (req, res) => {
  
  console.log("login in vaultlock ");
  console.log(req.body);
  res.render('password/login', { error: null });
});

// Login form submission route
router.post('/password/login',isLoggedIn, loginSubmit);

// Signup form route
router.get('/password/signup',isLoggedIn, (req, res) => {
  console.log("signup in vaultlock ");
  console.log(req.body);
  res.render('password/signup', { error: null });
});

// Signup form submission route
router.post('/password/signup',isLoggedIn, signupSubmit);


/**
 * Password Manager Routes 
*/


// Password manager's forget password form
router.get('/password/forget-password',isLoggedIn, forgetPasswordController.getForgetPassword);
router.post('/password/forget-password',isLoggedIn, forgetPasswordController.postForgetPassword);

// Password manager's reset password form
router.get('/password/reset-password/:id/:token',isLoggedIn, forgetPasswordController.getResetPassword);
router.post('/password/reset-password/:id/:token',isLoggedIn, forgetPasswordController.postResetPassword);


// Middleware for checking JWT authentication for password manager routes
// router.use('/password', checkPasswordAuth);

// Password manager's main index page
router.get('/password', isLoggedIn, passwordController.password);

router.get('/password/item/:id', isLoggedIn, passwordController.passwordViewNote);
router.put('/password/item/:id', isLoggedIn, passwordController.passwordUpdateNote);
router.delete('/password/item-delete/:id', isLoggedIn, passwordController.passwordDeleteNote);
router.get('/password/add', isLoggedIn, passwordController.passwordAddNote);
router.post('/password/add', isLoggedIn, passwordController.passwordAddNoteSubmit); 
router.post('/password/search', isLoggedIn, passwordController.passwordSearchSubmit);

module.exports = router;
