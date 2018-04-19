'use strict';

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");
var promise = require("bluebird");

var _ = require("lodash");
//========================== Load internal modules ====================
const Connect = require('./connectModel')
// init user dao
let BaseDao = new require('../dao/baseDao');
const connectDao = new BaseDao(Connect);
var prevValue=0;



function createFeed(argument,userObj) {
	let userData={}
	 userData= argument;
	 userData.senderInfo = {
		"fullName":userObj.name,
    	"id":userObj.userId,
    	"email":userObj.email
	}
	let connect = new Connect(userData);
	return connectDao.save(connect)
}

function feeds(argument) {
	// body...
	let query={}
	query.status='PUBLIC';
	query.isActive=1;
	return connectDao.findFeeds(query);
}


function checkDiff() {
	let query ={}
	query.isActive=1
	return connectDao.findAndCount(query).then((result)=>{
		if(result == prevValue){
			return 0;
		}else{
			prevValue = result
			return 1;
		}
	});
}

function likeFeed(postId,user) {
	let query ={};
	query.isActive=1;
	query._id = postId;
	let update={}
	update['$addToSet'] = {like:{fullname:user.name,id:user.userId,profileImage:user.picture || ''}};
	let option={};
	option['new']= true;
	return connectDao.findOneAndUpdate(query,update,option);
}


function checkLike(postId,userData) {
	let query={};
	query.isActive=1;
	query._id = postId;
	return connectDao.findOne(query);
}

function unlikeFeed(postId,userData){
	let query ={};
	query.isActive=1;
	query._id = postId;
	let update={}
	update['$pull'] = {like:{id:userData.userId}};
	let option={};
	option['new']= true;
	return connectDao.findOneAndUpdate(query,update,option);
}

function commentFeed(postId,comment,data) {
	let query={};
	query.isActive=1;
	query._id = postId;
	let update={};
	update['$addToSet'] = {comment:{fullname:data.name,id:data.userId,profileImage:data.picture || '',text:comment}};
	let option={}
	option["new"]= true;
	return connectDao.findOneAndUpdate(query,update,option);
}


function deleteComment(postData,userData){
	let query ={};
	query.isActive=1;
	query._id = postData.postId;
	let update={}
	update['$pull'] = {comment:{_id:postData.commentId,id:userData.userId}};
	let option={};
	option['new']= true;
	return connectDao.findOneAndUpdate(query,update,option);
}


module.exports={
	createFeed,
	feeds,
	checkDiff,
	likeFeed,
	checkLike,
	unlikeFeed,
	commentFeed,
	deleteComment	
}