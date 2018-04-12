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
module.exports={
	createFeed,
	feeds,
	checkDiff
}