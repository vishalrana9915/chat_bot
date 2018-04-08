'use strict';

const connectDao = require('./connectDao');
const constants  = require('../constants')
function createFeed(feeds){
	let updatedObj = feeds;
	if(feeds.picture){
	updatedObj.picture = constants.PATH.UPLOADBASE+feeds.picture;
	}
	
	
	return connectDao.createFeed(updatedObj)
			.then(result=>result)
}

function feeds() {
	
	return connectDao.feeds()
			.then(result=>result)
}


module.exports={
	createFeed,
	feeds
}