var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  if(req.session.name==='user'){
    res.render('index', { title: 'hh1901hh' });
  }else{
    res.redirect('/users/login')
  }
});

module.exports = router;
