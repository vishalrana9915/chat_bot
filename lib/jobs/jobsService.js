'use strict';
const jobDao = require('./jobsDao');

function createJob(data){
	return jobDao.createJob(data)
				.then(res=>res);
}



module.exports={
	createJob
};