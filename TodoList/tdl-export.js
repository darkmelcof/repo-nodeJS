var fs = require('fs'); // Load middlewareFileSystem 
var csv_export = require('csv-export'); // Load middleware csv_export

/* Export JSON format documents into CSV zipped */
var formatCSV = function(todoList, callback) {
	var documents = [];
    todoList.forEach(function(todo, index){
        documents.push({todo});  
    });

	csv_export.export(documents, function(buffer) {
		// returns a buffer for the csv files already compressed into a single zip. 
		// save the zip or force file download via express or other server 
        var filePath = './data.zip'
    	fs.writeFileSync(filePath, buffer);
        callback(filePath);
    });	
}

exports.formatCSV = formatCSV;