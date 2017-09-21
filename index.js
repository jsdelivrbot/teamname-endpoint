var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:unicorntoaster1@ds147034.mlab.com:47034/teamnamedb');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function (request, response) {
    response.render('pages/index');
});
app.get('/products', function (req, res, next = (response)=>res.send(response)) {
    db.products.find(function (err, docs) {
        if(err){
            console.log(JSON.stringify(err));
        }
        else{
            next(JSON.stringify(docs,null,'  '));
        }
    });
});
app.get('/addProduct/lookupcode/:lookupcode/count/:count', function (req, res,next=(resCode)=>{res.send(resCode)}) {
    db.products.insert({"lookupcode":req.params.lookupcode,"count":req.params.count,"createdOn":new Date()}, function (err, doc) {
        if (err) {
            next(400);
            console.log(JSON.stringify(err));
        }
        else {
            next(200);
        }
    });
});
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
