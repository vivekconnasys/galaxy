var fs = require('fs');
var readLine = require('readline');
var Galaxy = require('./galaxy.js');

/* Catch new line event */
var Reader = readLine.createInterface({
	input : fs.createReadStream('./inputFile.txt'),
	terminal : false
});

/* Process each line through buyer function */
Reader.on('line', function(line) {
	console.log('INPUT: '+line.trim());
	Galaxy.Buyer(line.trim());
});

/* For Uncaught Exceptions */
process.on('uncaughtException', function(err) {
	console.log('Exception: '+err);
});