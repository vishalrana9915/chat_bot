'use strict';

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
// var _ = require("lodash");
//========================== Load internal modules ====================
const Employee = require('./employeeModel');
// init user dao
let BaseDao = new require('../dao/baseDao');
const employeeDao = new BaseDao(Employee);



function checkDetails(email){
	let query={};
	query.emailDetails = email;
	query.status = 'ACTIVE';
	return Employee.findOne(query);
}

function createResource(resource){
		resource.fullName = resource.firstName + (resource.lastName || '');
		let employee = new Employee(resource);
		return employeeDao.save(employee);

}



module.exports = {
	checkDetails,
	createResource
};