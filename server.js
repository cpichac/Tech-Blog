// Import required modules and packages
const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection'); // Your Sequelize configuration
const routes = require('./controllers'); // Your routes

// Create an instance of the Express.js application
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to handle POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up sessions for user authentication
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Set up Handlebars.js as the view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main', // Specify the default layout template (main.handlebars)
  layoutsDir: path.join(__dirname, 'views/layouts'), // Path to the layouts directory
  partialsDir: path.join(__dirname, 'views/partials'), // Path to the partials directory
}));

app.set('view engine', 'handlebars'); // Set Handlebars.js as the view engine


// Serve static assets from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the defined routes from your controllers
app.use('/blog', blogRoutes);
app.use('/user', userRoutes);

// Start the Sequelize database connection
sequelize.sync({ force: false }).then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
