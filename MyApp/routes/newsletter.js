/**
 * Created by Owner on 9/10/2017.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get("/", function(req, res, next){
    res.render('index', {title:"Newsletter"});
});

router.post("/", function(req, res, next){

    var writeToFile = fs.createWriteStream('subscribers.txt');
    writeToFile.write(req.body.email);
    return next('route');

});
router.post("/", function(req, res, next){
    req.assert('email', 'A valid Email is required!!').notEmpty().isEmail();
    var errors = req.validationErrors();
    //console.log(errors);
    if(errors) {
        res.render('error', {message:errors[0].msg, error:errors});
    }
    else
    {
        res.redirect('thankyou?' + 'email=' + req.body.email);
    }

});

module.exports = router;