var express = require('express');
var session = require('cookie-session'); // Load middleware sessions
var bodyParser = require('body-parser'); // Load middleware params manager
var csv_export=require('csv-export'); // Load middleware csv-export
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express(); // express framework


/* Use of sessions */
app.use(session({secret: 'todotopsecret'}))


/* Cookie Init */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* On affiche la todolist et le formulaire */
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
})

/* On affiche la todolist et le formulaire */
.post('/todo/download/', function(req, res) { 
    // not empty list
    if (typeof(req.session.todolist[0]) != 'undefined') {
        var documents = [];
        req.session.todolist.forEach(function(todo, index){
            documents.push({todo});  
        });
        //export data 
        console.log(documents);

        var fs = require('fs');       
        csv_export.export(documents,function(buffer){
          fs.writeFileSync('./data.zip',buffer);        
        });

    }
    
    res.redirect('/todo');
})

/* On ajoute un élément à la todolist */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Supprime un élément de la todolist */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* In case of not good URL redict to the main */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);