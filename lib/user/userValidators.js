//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");
//========================== Load Internal Module =========================
var appUtils = require("../appUtils");
var userConst = require("./userConstants");
var exceptions = require("../customExceptions");
//========================== Load Modules End =============================



//========================== Export Module Start ===========================

var validateRegister = function(req,res,next){
    var errors=[]
    if (_.isEmpty(req.body.name)) {
        errors.push({ fieldName: "name", message: userConst.MESSAGES.NAME_CANT_EMPTY });
    }
    if (_.isEmpty(req.body.password)) {
        errors.push({ fieldName: "Password", message: userConst.MESSAGES.PWD_CANT_EMPTY });
    }

    if (_.isEmpty(req.body.email)) {
      //  errors.push({ fieldName: "email", message: userConst.MESSAGES.EmailCantEmpty });
    } else {
        if (!appUtils.isValidEmail(req.body.email)) {
            errors.push({ fieldName: "email", message: userConst.MESSAGES.InvalidEmail });
        }
    }
    if (errors && errors.length > 0) {
        console.log("in error")
        validationError(errors, next);
    }

    next()
}



var validateLogin = function (req, res, next) {

    var {email,password} = req.body;
    // var { lat, lng, app_version, platform, ios_version } = req.headers;
    var errors = [];

   
    if (_.isEmpty(password)) {
        errors.push({ fieldName: "Password", message: userConst.MESSAGES.PWD_CANT_EMPTY });
    }
    
    email = req.body.email = _.toLower(email);
    


    //req.body.hash = appUtils.bcryptHashPassword(password);
    next();
};


var validateUserId = function (req, res, next) {

    var { invitedByUserId } = req.body;
    var errors = [];
    if (_.isEmpty(invitedByUserId)) {
        errors.push({ fieldName: "invitedByUserId", message: userConst.MESSAGES.UserIdCantEmpty });
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};
var validateUsersId = function (req, res, next) {

    var { userId } = req.body;
    var errors = [];
    if (_.isEmpty(userId)) {
        errors.push({ fieldName: "userId", message: userConst.MESSAGES.UserIdCantEmpty });
    }
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};
var validateGetConnectionPageList = function (req, res, next) {

    var { pageNo, count } = req.params;
    var errors = [];

    if (pageNo) {
        pageNo = req.body.pageNo = parseInt(pageNo);
    }

    if (count) {
        count = req.body.count = parseInt(count);
    }

    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};

var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(userConst.MESSAGES.validationError, errors))
    }
    next();
}

module.exports = {
    validateLogin,
    validateRegister,
    validateUserId,
    validateGetConnectionPageList,
    validateUsersId
};
//========================== Export module end ==================================
