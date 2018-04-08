//========================== Load Modules Start ===========================

//========================== Load external Module =========================
var _ = require("lodash");
//========================== Load Internal Module =========================
var appUtils = require("../appUtils");
var connectConst = require("./connectConstants");
var exceptions = require("../customExceptions");
//========================== Load Modules End =============================







var createFeed = function(req,res,next){
    var errors=[];
    if (_.isEmpty(req.body.picture) &&  _.isEmpty(req.body.content)) {
        errors.push({ fieldName: "Invalid content", message: connectConst.MESSAGES.FIELD_CANT_EMPTY });
    }
   
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }

    next();
};


var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(connectConst.MESSAGES.validationError, errors));
    }
    next();
};


module.exports={
    createFeed
}