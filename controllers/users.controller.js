var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req,res){
    res.render('users/index',{
        users : db.get('users').value()
    });
};
module.exports.search = function(req,res){
    var q = req.query.q;
    var filterUser = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('users/index',{
        users : filterUser,
        key : q
    });
};
module.exports.get = function(req,res){
    res.render('users/create');
};
module.exports.view = function(req,res){
    var id = req.params.id;
    var user = db.get('users').find({id:id}).value();
    res.render('users/view',{
        user : user 
    })
};
module.exports.postCreate = function(req,res){
    var errors = [];
    if (!req.body.name){
        errors.push('Name is required');
    };
    if (!req.body.phone){
        errors.push('Phone is required'); 
    }
    if (errors.length){
        res.render('users/create',{
            errors : errors,
            values : req.body
        });
        return ;
    }
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};