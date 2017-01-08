var express = require('express');
var router = express.Router();

var user = require('../models/users');

// get register
router.get('/register', function(req, res) {
	res.render('register');
});

// login
router.get('/login', function(req, res) {
	res.render('login');
});

// get register
router.post('/register', function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	}
	else{
		var newUser = new User({
			name: name,
			email: email,
			username: username;
			password: password;
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('sucess_msg', 'You are registered and can now login');

		res. redirect('/users/login');
	}
});


module.exports = router;