'use strict';

//========================== Load Modules Start ===========================

//========================== Load External Module =========================

var sha256 = require('sha256');
var promise  = require('bluebird');
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");
//========================== Load Modules End =============================

//========================== Export Module Start ===========================


/**
 * return user home
 * @returns {*}
 */
function getUserHome() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

function getNodeEnv() {
    return process.env.NODE_ENV;
}

/**
 * returns if email is valid or not
 * @returns {boolean}
 */
function isValidEmail(email) {
    var pattern = /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/;
    return new RegExp(pattern).test(email);
}

/**
 * returns if zipCode is valid or not (for US only)
 * @returns {boolean}
 */
/*function isValidPhoneNumber(num) {
 if (Number.isInteger(num)) {
 num = num.toString();
 }
 if (phoneNumber.indexOf("+") > -1)
 return new RegExp(pattern).test(zipcode);
 }*/
/**
 * returns if zipCode is valid or not (for US only)
 * @returns {boolean}
 */
function isValidZipCode(zipcode) {
    var pattern = /^\d{5}(-\d{4})?$/;
    return new RegExp(pattern).test(zipcode);
}
/**
 * returns if zipCode is valid or not (for US only)
 * @returns {boolean}
 */
function createHashSHA256(pass) {
    return sha256(pass);
}

/**
 * returns random number for password
 * @returns {string}
 */
var getRandomPassword = function () {
    return getSHA256(Math.floor((Math.random() * 1000000000000) + 1));
};

var getSHA256 = function (val) {
    return sha256(val + "password");
};

/*var encryptHashPassword = function (password, salt) {
    return bcrypt.hashSync(password, salt);
}*/

  function generateSaltAndHashForPassword(password) {
        return bcrypt.hash(password,10);
}


function verifyPassword(user,isExist){
    console.log("password comparing");
    return bcrypt.compare(user.password,isExist.password);
}
/**
 *
 * @param string
 * @returns {boolean}
 */
var stringToBoolean = function (string) {
    switch (string.toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1":
            return true;
        case "false":
        case "no":
        case "0":
        case null:
            return false;
        default:
            return Boolean(string);
    }
};


/**
 *
 * @returns {string}
 * get random 6 digit number
 * FIX ME: remove hard codeing
 * @private
 */
function getRandomOtp(){
    //Generate Random Number
    return randomstring.generate({
        charset: 'numeric',
        length : 6
    });
}

function isValidPhone(phone , verifyCountryCode ){
    var reExp = verifyCountryCode ? /^\+\d{6,16}$/ : /^\d{6,16}$/;
    return reExp.test(phone);
}

function createRedisValueObject(obj) {
    var respObj = {};
    var user = obj.user;
    respObj.name = user.name;
    respObj.email = user.email;
    respObj.socailId = user.socailId;
   
    return respObj;
}

function createRedisValueObjectAdmin(obj) {
    var respObj = {};
    var admin = obj.admin;
    respObj.fullname = admin.adminFullName;
    respObj.email = admin.adminEmail;
    return respObj;
}

//========================== Export Module Start ===========================

module.exports = {
    appHttpClient: require("./appHttpClient"),
    getUserHome, getNodeEnv,
    verifyPassword,
    isValidEmail,
    isValidZipCode,
    //isValidPhoneNumber,
    createHashSHA256,
    getRandomPassword,
    //encryptHashPassword,
    generateSaltAndHashForPassword
    // stringToBoolean,
    // getRandomOtp,
    // isValidPhone,
    // createRedisValueObject,
    // createRedisValueObjectAdmin
};

//========================== Export Module End===========================
