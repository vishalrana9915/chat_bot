'use strict';

const connectDao = require('./connectDao');
const constants  = require('../constants')
function createFeed(feeds,userObj){
	let updatedObj = feeds;
	if(feeds.picture){
	updatedObj.picture = constants.PATH.UPLOADBASE+feeds.picture;
	}
	return connectDao.createFeed(updatedObj,userObj)
			.then(result=>result)
}

function feeds() {
	
	return connectDao.feeds()
			.then(result=>result)
}


function checkDiff() {
	
	return connectDao.checkDiff()
			.then(result=>result)
}



module.exports={
	createFeed,
	feeds,
	checkDiff
}