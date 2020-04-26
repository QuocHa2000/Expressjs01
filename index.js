var express = require('express');
var port = 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var app = express();
var db = require('./db');

var authMiddleware = require('./middleware/auth.middleware');
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing multipart/form-data
app.use(express.static('public'));
app.use(cookieParser())

app.get('/',function(req,res){
    res.render('index',{
        name : 'Quoc'
    });
})
app.use('/users',authMiddleware.authRequire,userRoute);
app.use('/auth',authRoute);

app.listen(port,function(){
    console.log('App is on port '+ port);
})


