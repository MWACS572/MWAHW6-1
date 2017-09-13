/**
 * Created by Owner on 9/10/2017.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

    res.render('thankyou', {email:req.query.email});
})

module.exports = router;