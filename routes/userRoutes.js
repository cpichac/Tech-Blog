const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup, login, logout } = require('../controllers/authController');

// Route for user registration (signup)
router.post('/signup', signup);

// Route for user login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error during login' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    req.login(user, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error during login' });
      }
      return res.status(200).json({ message: 'User logged in' });
    });
  })(req, res, next);
});

// Route for user logout
router.get('/logout', logout);

module.exports = router;
