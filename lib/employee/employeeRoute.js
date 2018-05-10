const employeeRoutr = require("express").Router();
const resHndlr = require("../responseHandler");
const validators=require("./employeeValidator");
const middleWare = require("../middleWare");
const employeeFacade = require('./employeeFacade');


employeeRoutr.route('/createResource').post([middleWare.authenticate.autntctTkn,validators.checkCreate],(req,res)=>{
	employeeFacade.createResource(req.body,req.user)
			.then((result)=> {
            resHndlr.sendSuccess(res, result);
        }).catch((err)=> {
             resHndlr.sendError(res, err);
        });
	
})










module.exports = employeeRoutr;