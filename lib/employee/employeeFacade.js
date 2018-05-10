'use strict';
const employeeService = require('./employeeService');


function createResource(body,auth){
		body.employeer = auth.userId;
	return employeeService.createResource(body)
				.then(res=>res);
}



module.exports = {
createResource
}