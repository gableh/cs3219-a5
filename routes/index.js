var express = require('express');
var router = express.Router();

/* GET Generic Graph page. */
router.get('/', function (req, res, next) {
    res.render('graph', {title: 'Express'});
});


/* GET Mulitseries Graph page. */
router.get('/msgraph', function (req, res, next) {
    res.render('msgraph', {title: 'Express'});
});

/* GET Single Graph page. */
router.get('/sgraph', function (req, res, next) {
    res.render('sgraph');
});

/* GET Single Graph page. */
router.get('/networkgraph', function (req, res, next) {
    res.render('networkgraph');
});


module.exports = router;
