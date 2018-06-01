const jobRoutr = require("express").Router();
const resHndlr = require("../responseHandler");
const validators=require("./jobsValidator");
const middleWare = require("../middleWare");
const jobFacade = require('./jobsFacade');


jobRoutr.route('/createJob').post([middleWare.authenticate.autntctTkn,validators.checkCreate],(req,res)=>{
	jobFacade.createJob(req.body,req.user)
			.then((result)=> {
            resHndlr.sendSuccess(res, result);
        }).catch((err)=> {
             resHndlr.sendError(res, err);
        });
	
});










module.exports = jobRoutr;