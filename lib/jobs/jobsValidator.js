//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");
//========================== Load Internal Module =========================
var appUtils = require("../appUtils");
var jobsConst = require("./jobsConstants");
var exceptions = require("../customExceptions");
//========================== Load Modules End =============================







var checkCreate = function(req,res,next){
    var errors=[];
    console.log(req.body);
    if (_.isEmpty(req.body.jobTitle) ||  _.isEmpty(req.body.jobField) ||  _.isEmpty(req.body.assignTo.name)||  _.isEmpty(req.body.assignTo.assigneeId) ) {
        errors.push({ fieldName: "Invalid content", message: jobsConst.MESSAGES.FIELD_CANT_EMPTY });
    }
   
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }

    next();
};


var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(jobsConst.MESSAGES.VALIDATIONERROR, errors));
    }
    next();
};


module.exports={
    checkCreate
};