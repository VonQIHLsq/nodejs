var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
})
.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
