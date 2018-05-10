'use strict';
const jobService = require('./jobsService');


function createJob(body,auth){
	body.createdBy = {
		name:auth.name,
		userId:auth.userId
	}
	return jobService.createJob(body)
				.then(res=>res);
}


module.exports = {
	createJob
}