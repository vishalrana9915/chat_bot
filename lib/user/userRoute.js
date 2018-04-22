const usrRoutr = require("express").Router();
const resHndlr = require("../responseHandler");
const middleware = require("../middleware");
const usrFacade = require("./userFacade");
const constants = require("../constants");
const jwtHandler = require("../jwtHandler");
const appUtil = require("../appUtils");
//const mediaUpload = require("../mediaupload/mediaUploadmiddleware");
const validators=require("./userValidators");


/**
*@ Creating new entry into system
*/

usrRoutr.route('/register')
.post([validators.validateRegister,validators.changeName],(req,res)=>{
    let userObj = req.body;
    usrFacade.signup(userObj).then((result)=> {
            resHndlr.sendSuccess(res, result);
        }).catch((err)=> {
             resHndlr.sendError(res, err);
        });
});

/**
*@ Authenticating user
*/

usrRoutr.route("/login")
    .post([validators.validateLogin],(req, res)=> {
        let {email,password} = req.body;
        usrFacade.login({
            email,
            password
        }).then((result)=>{
            resHndlr.sendSuccess(res, result);
        }).catch((err)=>{
             resHndlr.sendError(res, err);
        });
    });

/**
*@ Getting current user props
* token value needed
*/

usrRoutr.route("/currentUser")
.get((req,res)=>{
    usrFacade.currentUser(req)
        .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err =>  resHndlr.sendError(res, err));
});

/**
*@ searching user friends
* token value needed
*/

usrRoutr.route("/search_friends")
.get([middleware.authenticate.autntctTkn],(req,res)=>{
    usrFacade.search_friends(req)
        .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err =>  resHndlr.sendError(res, err));
});

/**
*@ creating room for chat using client uuid
* token value needed
*/

usrRoutr.route("/createRoom")
.post([middleware.authenticate.autntctTkn],(req,res)=>{
    usrFacade.createRoom(req)
    .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err =>  resHndlr.sendError(res, err));
});

/**
*@ Sending message to uuids
* token value needed
*/

usrRoutr.route("/sendMessage")
.post([middleware.authenticate.autntctTkn],(req,res)=>{
     usrFacade.sendMessage(req)
    .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err => resHndlr.sendError(res, err));
});

/**
*@ Sending friend request
* token value and body uuid needed
*/
usrRoutr.route('/sendRequest')
    .post([middleware.authenticate.autntctTkn],(req,res)=>{
         usrFacade.sendRequest(req)
    .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err => resHndlr.sendError(res, err));
    });


/*
swagger done till here
*/

/**
*@ Getting users notifications
* token value needed
*/
usrRoutr.route('/showUserFriendRequests')
.get([middleware.authenticate.autntctTkn],(req,res)=>{
    usrFacade.showUserFriendRequests(req.user)
    .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err => resHndlr.sendError(res, err));
});

/**
*@ Accept/Reject users Request
* token value needed
*/

usrRoutr.route('/acceptRejectFriendRequests')
.post([middleware.authenticate.autntctTkn],(req,res)=>{
    usrFacade.acceptRejectFriendRequests(req.body,req.user)
    .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err => resHndlr.sendError(res, err));
});

/**
*@ Monitoring daily activities
* token value needed
*/

usrRoutr.route('/dailyActivity')
.get([middleware.authenticate.autntctTkn],(req,res)=>{
    usrFacade.dailyActivity()
    .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err => resHndlr.sendError(res, err));
})

/**
*@ Listing user current chat rooms
* token value needed
*/

usrRoutr.route('/viewRooms')
.get([middleware.authenticate.autntctTkn],(req,res)=>{
    usrFacade.viewRooms(req.user)
    .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err => resHndlr.sendError(res, err));
})

/**
*@ Listing all users for angu
* token value needed
*/
usrRoutr.route('/viewAll')
.get([middleware.authenticate.autntctTkn],(req,res)=>{
    usrFacade.viewAll(req.user.userId)
    .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err => resHndlr.sendError(res, err));
})

/**
*@ Listing all chat message from room id
* token value needed
*/
usrRoutr.route('/getChat')
.get([middleware.authenticate.autntctTkn],(req,res)=>{
    usrFacade.getChat(req.query.room)
    .then(result=> resHndlr.sendSuccess(res,result))
    .catch(err => resHndlr.sendError(res, err));
})
/** 
Exporting module
*/
module.exports = usrRoutr;
