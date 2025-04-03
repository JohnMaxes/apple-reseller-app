var express = require('express');
const query = require('../../db');
// jwt

var router = express.Router();
/* GET home page. */
router.get('/auth/login', function(req, res, next) {
  query('SELECT * users')
  res.send('hi');
});

module.exports = router;
