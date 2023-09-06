// In homeController.js
const express = require('express');
const router = express.Router();
// Import necessary modules and dependencies
const passport = require('passport');
const { User } = require('../models'); // Import your Sequelize User model

// Controller function for user registration (signup)
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Create a new user record in the database
    const newUser = await User.create({ username, password });
    
    // Log the user in after successful registration
    req.login(newUser, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error during login' });
      }
      return res.status(201).json({ message: 'User registered and logged in' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during registration' });
  }
};

// Controller function for user login
const login = async (req, res) => {
  // Passport middleware handles authentication
  passport.authenticate('local', (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error during login' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Log the user in after successful authentication
    req.login(user, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error during login' });
      }
      return res.status(200).json({ message: 'User logged in' });
    });
  })(req, res);
};

// Controller function for user logout
const logout = (req, res) => {
  req.logout(); // Passport middleware handles logout
  res.status(200).json({ message: 'User logged out' });
};

module.exports = { signup, login, logout };
