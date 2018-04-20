'use strict';

const connectDao = require('./connectDao');
const constants  = require('../constants');
const _  = require('lodash');






function createFeed(feeds,userObj){
	let updatedObj = feeds;
	if(feeds.picture.length>0){
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


function likeFeed(query,user) {
	return connectDao.checkLike(query.postId,user)
			.then((result)=>{
				if(result.like.length>0){
				console.log("has value")
					var checkKey=true;
					_.forEach(result.like,function(value,index){
							if(value.id == user.userId){
								console.log("already liked it")
								return connectDao.unlikeFeed(query.postId,user).then(unliked=>unliked);
							}else{
								console.log("already noy it==>"+index)

								if(index == result.like.length-1){
									console.log("in like field")
									return connectDao.likeFeed(query.postId,user)
									.then((likedPost)=>{
									return result;
									})
								}
							}
					})
				}else{
					console.log("no value")
	return connectDao.likeFeed(query.postId,user)
				.then((likedPost)=>{
				return result;
				})
				}
				
			})
}


function commentFeed(query,comment,data) {
	
	return connectDao.commentFeed(query.postId,comment,data)
		.then(res=>res);
			
}

function deleteComment(query,data) {
	
	return connectDao.deleteComment(query,data)
		.then(res=>res);
			
}

module.exports={
	createFeed,
	feeds,
	checkDiff,
	likeFeed,
	commentFeed,
	deleteComment
}