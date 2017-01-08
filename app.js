var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('express-session');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

// Init App
var app = express(); 

// View Engin (handle bars ....)
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout:'layout' }));
app.set('view engin', 'handlebars');

// Body Parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: flash }));
app.use(cookieParser());

// Static Content
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}

		return {
			param : formParam,
			msg : msg, 
			value : value
		};
	}
})); 

// Connect Flash
app.use(flash());

// Global Variables for flash messages
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('eror_msg');
	res.locals.error = req.flash('error');
	next(); 
});

// Route files
app.use('/',  routes);
app.use('/users', users);

// Set port 
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
	console.log('Server running on port ' + app.get('port'));
});

