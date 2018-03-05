/**
 * Created by kunal on 19/12/16.
 */


const promise = require('bluebird-extra'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    TAG = 'shineapp-upload',
    unlink = promise.promisify( fs.unlink , fs ),
    logger = require('../logger/index');
var AWS = require('aws-sdk');
const options = require('../config');


var s3 = new AWS.S3({accessKeyId: options.cfg.iamUser.keyId, secretAccessKey: options.cfg.iamUser.accessKey});
var seq = new Date().getTime();

module.exports = { uploadSingleMediaToS3, uploadToS3 };

function uploadSingleMediaToS3() {

    return function(req, res, next) {

        var files = _fetchFilesFromReq(req);
        if (!files) {
            return next();
        }

        return new promise(function (resolve, reject) {
            var file = files[0];
            var params = {Bucket: options.cfg.s3.bucketName, Key: String(seq++ + path.extname(file.originalname)), Body: fs.createReadStream(file.path), ACL : options.cfg.s3.ACL};
            s3.upload(params, function (err, data) {
                if (data) {
                    req.body.location = data.Location;
                }
                __deleteFiles(_.map(files, 'path'));
                next();
            });
        });

    };
}

function uploadToS3(bucket, key, filePath, fieldname) {
    return new promise(function (resolve, reject) {
        var params = {Bucket: bucket, Key: key, Body: fs.createReadStream(filePath), ACL : options.cfg.s3.ACL};
        s3.upload(params, function (err, data) {
            if (data) {
                return resolve({field : fieldname, location : data.Location});
            } else {
                return reject(err);
            }
            // __deleteFiles(_.map(files, 'path'));
        });
    });
}

function _fetchFilesFromReq(req) {

    if(req.file) {
        return [ req.file ];
    } else if(req.files) {
        return req.files;
    } else {
        //No Data
    }
}


function __deleteFiles( filePathList) {
    var promiseArray = [];

    _.each( _.uniq(filePathList) , function (path) {
        promiseArray.push( unlink( path ) );
    });

    promise.all( promiseArray )
        .then(  () => logger.debug( TAG , "All Files Deleted Successfully"))
        .catch(  err => logger.debug( err ));
}
