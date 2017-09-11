/**
 * Created by Owner on 9/10/2017.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get("/", function(req, res, next){
    console.log(req.csrfToken());
    res.render('homepage', {title:"Newsletter", csrftoken : req.csrfToken()});
});

router.post("/", function(req, res, next){

    fs.appendFile('subscribers.txt',req.body.email, function(err){
        if (err) throw err;
        else {
            return next('route');
        }
        });


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