var db = require('../db');

module.exports.get = function(req,res){
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start =(page-1) * perPage;
    var end = page*perPage;
    var num = 0;
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    res.render('product/product',{
        products : db.get('products').value().slice(start,end),
        num : num
    });
}