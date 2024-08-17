require('dotenv').config();
// config will read your .env file, parse the contents, assign it to process.env, 
// and return an Object with a parsed key containing the loaded content or an error key if it failed.

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");
require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');


const app = express();
const port = process.env.PORT;
// process.env is a reference to the system environment variables. 
// PORT means the application expects an environment variable named “PORT” to be set.
// mongodb://localhost:27017



app.use(session({
     secret: 'keyboard cat',
     resave: false,
     saveUninitialized: true,
     store: MongoStore.create({
       mongoUrl: process.env.MONGODB_URI
     }),
     //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
     // Date.now() - 30 * 24 * 60 * 60 * 1000
   }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
// express.urlencoded() is a built-in middleware in Express.js. 
// The main objective of this method is to parse the incoming request with urlencoded payloads and is based upon the body-parser.
// express.urlencoded() is required when you are submitting a form with post method 
// and you need to acess that form data using req.body , if you don't use it req.body would be undefined.
app.use(express.json());

// clear doubts on express.json() and express.urlencoded()
// 1> You DO NOT NEED express.json() and express.urlencoded() for GET Requests or DELETE Requests.

// 2> You NEED express.json() and express.urlencoded() for POST and PUT requests, 
// because in both these requests you are sending data (in the form of some data object) 
// to the server and you are asking the server to accept or store that data (object), 
// which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

// 3> a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());
// b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());

// 4> If you use express.json() it will parse the body from post/fetch request except from html post form. It wont parse information from the html post form (for that use express.urlencoded())




app.use(cookieParser());
app.use(methodOverride("_method"));


// static file
app.use(express.static('public'));

// Templating engine
// A template engine enables you to use static template files in your application. 
// At runtime, the template engine replaces variables in a template file with actual 
// values, and transforms the template into an HTML file sent to the client. 
// This approach makes it easier to design an HTML page.
app.use(expressLayouts);
app.set('layout','./layouts/main');
// By default 'layout.ejs' is used. If you want to specify your custom 
// layout (e.g. 'layouts/layout.ejs'), just set layout property in express app settings.
app.set('view engine','ejs');


// Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));
app.use('/', require('./server/routes/bookmark'));
app.use('/', require('./server/routes/password'));


// Handle 404
// app.get('*', function(req, res) {
//   res.status(404).render('404');
// })


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
