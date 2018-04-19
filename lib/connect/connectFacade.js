'use strict';
const fs = require('fs');
const connectService = require('./connectService');
const async = require('async');
const _ = require('lodash');
  function convertingImageToBase(pic){
	var bitmap = fs.readFileSync(pic);
	// console.log("in reaad file")
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
		var another_val ={}
		var newResult = {}
		newResult = result
		// console.log("result")
	 for(var i=0;i<newResult.length;){

			if(newResult[i].picture.length>0){
				// console.log("before")
				var newCode =  convertingImageToBase(newResult[i].picture[0]);
				// console.log("new path")
				if(newCode){
					// console.log("i====================="+i)
					another_val[i] = newCode
					i++;
					// return newResult;
				}
			}else{
				i++;
				// return newResult;
			}


	 }
			
			if(i == newResult.length){
				var newObj = {
					result:newResult,
					images:another_val
				}
				return newObj;	

			}
		
			})
			}

function checkDiff(){
	return connectService.checkDiff()
	.then(result=>result);
}

function likeFeed(query,user){
	return connectService.likeFeed(query,user)
	.then(result=>result);
}

function commentFeed(query,comment,user){
	return connectService.commentFeed(query,comment,user)
	.then(result=>result);
}


function deleteComment(query,user){
	return connectService.deleteComment(query,user)
	.then(result=>result);
}

module.exports =  {
	createFeed,
	feeds,
	checkDiff,
	likeFeed,
	commentFeed,
	deleteComment
}