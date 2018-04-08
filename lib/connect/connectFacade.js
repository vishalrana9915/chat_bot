'use strict';

const connectService = require('./connectService');


function createFeed(feedObj){
	return connectService.createFeed(feedObj)
	.then(result=>result);
}

function feeds() {
	return connectService.feeds()
	.then(result=>result);
}

module.exports =  {
	createFeed,
	feeds
}