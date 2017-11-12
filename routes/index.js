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
router.get('/network', function (req, res, next) {
    res.render('networkgraph');
});
/* GET Single Graph page. */
router.get('/contemporary', function (req, res, next) {
    res.render('contemporaries');
});
/* GET Single Graph page. */
router.get('/transition', function (req, res, next) {
    res.render('transitions');
});
/* GET Single Graph page. */
router.get('/top', function (req, res, next) {
    res.render('top');
});
/* GET sample js page. */
router.get('/sample', function (req, res, next) {
    res.render('top');
});
/* GET wordcloud page. */
router.get('/wordcloud', function (req, res, next) {
    res.render('wordcloud');
});
module.exports = router;
