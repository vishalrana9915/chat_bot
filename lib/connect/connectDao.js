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




function createFeed(argument) {
	
	let connect = new Connect(argument);
	return connectDao.save(connect)
}

function feeds(argument) {
	// body...
	let query={}
	query.status='PUBLIC';
	query.isActive=1;
	return connectDao.findFeeds(query);
}

module.exports={
	createFeed,
	feeds
}