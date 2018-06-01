'use strict';

const employeeDao = require('./employeeDao');
const constants  = require('../constants');
const _  = require('lodash');


function createResource(body){
		return employeeDao.checkDetails(body.email)
				.then((result)=>{
					if(result){
						return {};
					}else{
						return employeeDao.createResource(body)
									.then(res => res);
					}
				});

		}



module.exports={
	createResource
};