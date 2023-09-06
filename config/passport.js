const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User'); // Import your User model

// Configure the local strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'username', // Field for the username in your login form
    passwordField: 'password', // Field for the password in your login form
  },
  (username, password, done) => {
    // Find the user by their username in the database
    User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        // Check if the password matches
        if (!user.validatePassword(password)) {
          return done(null, false, { message: 'Incorrect password' });
        }
        // Authentication succeeded, return the user object
        return done(null, user);
      })
      .catch((err) => done(err));
  }
));

// Serialize and deserialize user functions (used to store and retrieve user data in sessions)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
