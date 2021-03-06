var db = require('../db');

module.exports.authRequire = function(req,res,next){
    if (!req.signedCookies.userId){
        res.redirect('/auth/login');
        alert('You have to login first');
        return;
    }
    var user = db.get('users').find({id : req.signedCookies.userId}).value();

    if(!user){
        res.redirect('/auth/login');
        alert('You have to login first');
        return;
    }
    next();
}