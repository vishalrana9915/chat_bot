"use strict";

//========================== Load Modules Start ===========================
var promise = require("bluebird");
//========================== Load internal Module =========================
var exceptions = require("../customExceptions.js");
var jwtHandler = require("../jwtHandler");
// var versionDao = require("../appversion/versiondao");
var constants = require("../constants");

//========================== Load Modules End =============================

// var __verifyTok = function (acsTokn) {
//     return jwtHandler.verifyUsrToken(acsTokn)
//         .then(function (tokenPayload) {
//             return tokenPayload;
//         })
//         .catch(function (err) {
//             throw err;
//         });
// };

// var expireToken = function(req, res, next) {
    
//     return jwtHandler.expireToken(req)
//     .then(function(result) {
//          result;
//         next();
//     })
//     .catch(function (err) {
//             next(err);
//         });
// };

// var __verifyAppVersion = function (app_version) {
//     if (app_version && !Number.isInteger(app_version)) {
//         app_version = parseInt(app_version);
//     }
//     return versionDao.getLatestVersion()
//         .then(function (version) {
//             let current_version;
//             if (version.length > 0) {
//                 current_version = version[0].current_version;
//             }
//             if (app_version < current_version) {
//                 throw exceptions.invalidAppVersion();
//             }
//             return version;
//         });
// };

// var autntctTkn = function (req, res, next) {
//     var acsToken = req.get('accessToken');
//     __verifyTok(acsToken)
//         .bind({})
//         .then(function (tokenPayload) {
//             return tokenPayload;
//         })
//         .then(function (paylod) {
//             this.payload = paylod;
//             var app_version = req.get('app_version');
//             let verifyAppVersion = __verifyAppVersion(app_version);
//             return verifyAppVersion;
//         })
//         .then(function (result) {
//             req.user = this.payload;
//             next();
//         })
//         .catch(function (err) {
//             next(err);
//         });
// };

// var getISO = function(req, res, next) {
//     var ISO = req.get('countryISO');
//     console.log('ISO----------',ISO);
//     return ISO;
// };

// var verifyAppVersion = function (req, res, next) {
//     var app_version = req.get('app_version');
//     return __verifyAppVersion(app_version)
//         .then(function (result) {
//             next();
//         })
//         .catch(function (err) {
//             next(err);
//         });
// };

//========================== Export Module Start ===========================

module.exports = {
    // autntctTkn,
    // verifyAppVersion,
    // getISO,
    // expireToken
};

//========================== Export Module End ===========================
