const connectRoutr = require("express").Router();
const resHndlr = require("../responseHandler");
const validators=require("./connectValidator");
const middleWare = require("../middleWare");
const connectFacade = require('./connectFacade');


/**
*@ Creating new file upload into system
*/

connectRoutr.route('/uploadFile')
.post([middleWare.authenticate.autntctTkn,middleWare.multer.single('file')],(req,res)=>{
    	return  resHndlr.sendSuccess(res, req.file.filename);
});


/**
*@ Creating new feed into system
*/
connectRoutr.route('/createFeed')
.post([validators.createFeed,middleWare.authenticate.autntctTkn],(req,res)=>{
    let feedObj = req.body;
    connectFacade.createFeed(feedObj,req.user).then((result)=> {
            resHndlr.sendSuccess(res, result);
        }).catch((err)=> {
             resHndlr.sendError(res, err);
        }); 
});


/**
*@ View All posts
*/
connectRoutr.route('/feeds')
.get([middleWare.authenticate.autntctTkn],(req,res)=>{
    let feedObj = req.body;
    connectFacade.feeds().then((result)=> {
            resHndlr.sendSuccess(res, result);
        }).catch((err)=> {
             resHndlr.sendError(res, err);
        }); 
});


connectRoutr.route('/checkDiff')
    .get([middleWare.authenticate.autntctTkn],(req,res)=>{
    connectFacade.checkDiff().then((result)=> {
            resHndlr.sendSuccess(res, result);
        }).catch((err)=> {
             resHndlr.sendError(res, err);
        }); 
});


module.exports = connectRoutr;