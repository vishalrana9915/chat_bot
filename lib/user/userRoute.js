const usrRoutr = require("express").Router();
const resHndlr = require("../responseHandler");
const middleware = require("../middleware");
const usrFacade = require("./userFacade");
const constants = require("../constants");
const jwtHandler = require("../jwtHandler");
const appUtil = require("../appUtils");
//const mediaUpload = require("../mediaupload/mediaUploadmiddleware");
const validators=require("./userValidators");





usrRoutr.route('/signup')
.post([validators.validateRegister],(req,res)=>{
    let userObj = req.body;
    usrFacade.signup(userObj).then((result)=> {
            resHndlr.sendSuccess(res, result);
        }).catch((err)=> {
             resHndlr.sendError(res, err);
        })
})




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
        })
    });


// usrRoutr.route("/getUserProfile")
//     .post([middleware.authenticate.autntctTkn], function (req, res) {
//           let { user } = req;
//         let userId = user.userId;
//         usrFacade.getUserProfile(userId)
//             .then(function (result) {
//                 resHndlr.sendSuccess(res, result);
//             }).catch(function (err) {
//                 resHndlr.sendError(res, err);
//             })

//     });
// usrRoutr.route("/applyForTripOrganizer")
//     .post([middleware.authenticate.autntctTkn], function (req, res) {
//           let { user } = req;
//           console.log(user);
//         usrFacade.applyForOrganizer({user})
//             .then(function (result) {
//                 resHndlr.sendSuccess(res, result);
//             }).catch(function (err) {
//                 resHndlr.sendError(res, err);
//             })

//     });
// usrRoutr.route("/addConnection")
//     .post([middleware.authenticate.autntctTkn,validators.validateUserId], function (req, res) {
//          let { invitedByUserId } = req.body;
//           let { user } = req;
//            let userId = user.userId; 
//         usrFacade.addConnection({invitedToUserId:userId,invitedByUserId:invitedByUserId})
//             .then(function (result) {
//                 resHndlr.sendSuccess(res, result);
//             }).catch(function (err) {
//                 resHndlr.sendError(res, err);
//             })

//     });

// usrRoutr.route("/getConnection")
//     .post([middleware.authenticate.autntctTkn,validators.validateGetConnectionPageList], function (req, res) {
//           let { user } = req;
//            let userId = user.userId; 
//            let { pageNo, count,searchText } = req.body;
//         usrFacade.getConnections({userId,pageNo,count,searchText })
//             .then(function (result) {
//                 resHndlr.sendSuccess(res, result);
//             }).catch(function (err) {
//                 resHndlr.sendError(res, err);
//             })

//     });

// usrRoutr.route("/userBlockRequest")
//     .post([middleware.authenticate.autntctTkn,validators.validateUsersId], function (req, res) {
//          let { userId } = req.body;
//           let { user } = req;
        
//         usrFacade.userBlockRequest({userId,user})
//             .then(function (result) {
//                 resHndlr.sendSuccess(res, result);
//             }).catch(function (err) {
//                 resHndlr.sendError(res, err);
//             })

//     });




module.exports = usrRoutr;
