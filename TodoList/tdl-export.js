var fs = require('fs'); // Load middlewareFileSystem 
var csv_export=require('csv-export'); // Load middleware csv_export
var express = require('express');

var appp = express();

/* Export JSON format documents into CSV zipped */
var formatCSV = function(todoList) {
	var documents = [];
    todoList.forEach(function(todo, index){
        documents.push({todo});  
    });

	csv_export.export(documents, function(buffer) {
		// returns a buffer for the csv files already compressed into a single zip. 
		// save the zip or force file download via express or other server 
    	// TO CHANGE TO NO SYNC
    	fs.writeFileSync('./data.zip', buffer);

    });	
}

function hello(){
	console.log("hello");
}

function download()
exports.formatCSV = formatCSV;
exports.hello = hello;