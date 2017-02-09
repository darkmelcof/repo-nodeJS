var express = require('express');
var session = require('cookie-session'); // Load middleware sessions
var bodyParser = require('body-parser'); // Load middleware params manager
var fileExport = require('./tdl-export');
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

/* Display TODO.EJS */
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
})

.post('/todo/download/', urlencodedParser, function(req, res) { 
    if (typeof(req.session.todolist[0]) != 'undefined') {
        fileExport.formatCSV(req.session.todolist, function(res){
            console.log("fini");
        });
    } 
    fileExport.hello();
    res.redirect('/todo');
}) 

/* ADD element into todolist */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* DELETE element into todolist */
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