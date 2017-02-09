var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome home');
});

// Dynamic routing
app.get('/floor/:num', function(req, res) {
	// Get the template ejs in views folder
	res.render('floor.ejs', {number: req.params.num});
});

// Last case of routing at the end
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page not found !');
});

app.listen(8080);
