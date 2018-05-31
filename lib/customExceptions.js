//========================== Load Modules Start ===========================

//========================== Load Internal Module =========================

// Load exceptions
var Exception = require("./model/Exception");
var constants = require("./constants");

//========================== Load Modules End =============================

//========================== Export Module Start ===========================

module.exports = {
    intrnlSrvrErr: function (err) {
        return new Exception(1, constants.MESSAGES.intrnlSrvrErr, err);
    },
    unauthorizeAccess: function (err) {
        return new Exception(2, constants.MESSAGES.unAuthAccess, err);
    }
};

//========================== Export Module   End ===========================
