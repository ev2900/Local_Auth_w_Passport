var express = require('express');
var router = express.Router();

// get index
router.get('/', function(req, res) {
	res.render('index');
});

module.exports = router;