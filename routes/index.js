var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('msgraph', {title: 'Express'});
});

/* GET Single Graph page. */
router.get('/sgraph', function (req, res, next) {
    res.render('sgraph');
});


module.exports = router;
