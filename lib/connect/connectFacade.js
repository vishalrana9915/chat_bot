'use strict';
const fs = require('fs');
const connectService = require('./connectService');
const async = require('async');

async function convertingImageToBase(pic){
	var bitmap = fs.readFileSync(pic);
            			 // convert binary data to base64 encoded string
            			 //res.send(new Buffer(bitmap).toString('base64'));
             		return 	 new Buffer(bitmap).toString('base64');
}



function createFeed(feedObj,userObj){
	return connectService.createFeed(feedObj,userObj)
	.then(result=>result);
}

function feeds() {
	return connectService.feeds()
	.then((result)=>{
		return result
	}
		);
}

module.exports =  {
	createFeed,
	feeds
}