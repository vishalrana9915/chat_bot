'use strict';

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
// var _ = require("lodash");
//========================== Load internal modules ====================
const Jobs = require('./jobsModel');
// init user dao
let BaseDao = new require('../dao/baseDao');
const jobsDao = new BaseDao(Jobs);

function createJob(data){
		let jobs = new Jobs(data);
		return jobsDao.save(jobs);
}


module.exports ={
	createJob
};