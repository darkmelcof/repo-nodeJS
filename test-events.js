var http = require('http');
var EventEmitter = require('events').EventEmitter; // Events

var server = http.createServer(function(req, res) {
    res.writeHead(200);

    var EventEmitter = require('events').EventEmitter;

    var jeu = new EventEmitter();

    jeu.on('gameover', function(message, foo){
        console.log(message, foo);
        
    });

    jeu.emit('gameover', 'Vous avez perdu !', 'moi le param2');
    
    res.end();
});



server.listen(8080); // Démarre le serveur

