var http = require('http');
var url = require('url');
var querystring = require('querystring'); // URL params strings format

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);

    res.writeHead(200, {"Content-Type": "text/plain"});

    if (page != "/") {
    	res.write("Error 404: Page not found");
    }else{
    	if ('firstname' in params && 'name' in params) {
        res.write('Hello ' + params['firstname'] + ' ' + params['name']);
	    }
	    else {
	        res.write('Hello you :)');
	    }
    }
    res.end(); // Send result to client
});

server.listen(8080);