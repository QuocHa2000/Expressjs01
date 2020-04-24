var express = require('express');
var port = 3000;
var bodyParser = require('body-parser');

var app = express();
var db = require('./db');

var userRoute = require('./routes/user.route');
app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing multipart/form-data
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('index',{
        name : 'Quoc'
    });
})
app.use('/users',userRoute);

app.listen(port,function(){
    console.log('App is on port '+ port);
})


