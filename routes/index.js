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
/* GET Single Graph page. */
router.get('/contemporaries', function (req, res, next) {
    res.render('contemporaries');
});
/* GET Single Graph page. */
router.get('/transitions', function (req, res, next) {
    res.render('transitions');
});
/* GET Single Graph page. */
router.get('/top', function (req, res, next) {
    res.render('top');
});


module.exports = router;
