var shortid = require('shortid');
var db = require('../db');

module.exports.login = function(req,res){
    res.render('auth/login');
}
module.exports.postLogin = function(req,res){
    var email = req.body.email;
    var password  = req.body.password;
    var user = db.get('users').find({email : email}).value();
    if (!user){
        res.render('auth/login',{
            errors : ['User does not exists.'],
            values : req.body
        })
        return ;
    }
    if(user.password !== password) {
        res.render('auth/login',{
            errors : ['Password is Wrong'],
            values : req.body
        })
        return;
    }
    res.cookie('userId',user.id,{
        signed : true 
    });
    res.redirect('/users');
};
module.exports.register = function(req,res){
    res.render('auth/register');
}
module.exports.postRegister = function(req,res){
    var userDB = db.get('users').find({email:req.body.email}).value();
    if(userDB) {
        res.render('auth/register',{
            errors:['Email existed.'],
            values : req.body
        });
        return;
    }
    if(req.body.password!==req.body.password2){
        res.render('auth/register',{
            errors: ['Nhập lại mật khẩu không đúng'],
            values:req.body
        });
        return;
    }
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/auth/login');
};