"use strict";

//========================== Load Modules Start ===========================
var promise = require("bluebird");
//========================== Load internal Module =========================
var exceptions = require("../customExceptions.js");
var jwtHandler = require("../jwtHandler");
// var versionDao = require("../appversion/versiondao");
var constants = require("../constants");

//========================== Load Modules End =============================

var __verifyTok = function (acsTokn) {
    return jwtHandler.verifyUsrToken(acsTokn)
        .then(function (tokenPayload) {
            return tokenPayload;
        })
        .catch(function (err) {
            throw err;
        });
};


var autntctTkn = function (req, res, next) {
    var acsToken = req.headers.authorization;
    __verifyTok(acsToken)
        .bind({})
        .then(function (tokenPayload) {
            return tokenPayload;
        })
        .then(function (result) {
            req.user =result;
            next();
        })
        .catch(function (err) {
            next(err);
        });
};

//========================== Export Module Start ===========================

module.exports = {
    autntctTkn
};

//========================== Export Module End ===========================
