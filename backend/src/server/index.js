const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./config');

const passport = require('passport');

const routes = require('./routes/index');

require('./middlewares/passport')(passport);

require('dotenv').config();
console.log(process.env)

const port = config.PORT;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//session init
app.use(session({
    secret: "best secret word",
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Initialize routes
app.use('/', routes);

app.set('view engine', 'ejs');
app.listen(port, () => console.log(`Listening on port ${ port }`));

