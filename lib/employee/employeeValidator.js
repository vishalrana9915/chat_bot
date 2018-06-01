//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");
//========================== Load Internal Module =========================
var appUtils = require("../appUtils");
var employeeConst = require("./employeeConstants");
var exceptions = require("../customExceptions");
//========================== Load Modules End =============================







var checkCreate = function(req,res,next){
    var errors=[];
    console.log(req.body);
    if (_.isEmpty(req.body.firstName) ||  _.isEmpty(req.body.designation)  || _.isEmpty(req.body.WorkingStartTime) || _.isEmpty(req.body.workingEndTime) || _.isEmpty(req.body.workingTiming)) {
        errors.push({ fieldName: "Invalid content", message: employeeConst.MESSAGES.FIELD_CANT_EMPTY });
    }
   
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }

    next();
};


var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(employeeConst.MESSAGES.VALIDATIONERROR, errors));
    }
    next();
};


module.exports={
    checkCreate
};