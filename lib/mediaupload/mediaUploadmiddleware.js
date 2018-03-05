/**
 * Created by kunal on 19/12/16.
 */


const promise = require('bluebird-extra'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    TAG = 'shineapp-upload',
    unlink = promise.promisify( fs.unlink , fs ),
    logger = require('../logger/index').logger;
var AWS = require('aws-sdk');
const options = require('../config/index');
//const imageProcessing = require('../post/imageprocessings');
//const postService = require('../post/postservice');
const mediaUploadService = require('./mediaUploadService');

AWS.config = {
    accessKeyId: options.cfg.iamUser.keyId,
    secretAccessKey: options.cfg.iamUser.accessKey,
    //region: options.cfg.s3.region,
    bucketName: options.cfg.s3.bucketName,
    signatureVersion: options.cfg.s3.signatureVersion,
};
var Bucket = options.cfg.s3.bucketName;
var s3 = new AWS.S3({params: {Bucket: Bucket}});

//var s3 = new AWS.S3({accessKeyId: options.cfg.iamUser.keyId, secretAccessKey: options.cfg.iamUser.accessKey});
var seq = new Date().getTime();

module.exports = { uploadSingleMediaToS3, uploadMultipleMediaToS3 };

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
                console.log(err);
                if (data) {
                    req.body.location = data.Location;
                }
                __deleteFiles(_.map(files, 'path'));
                next();
            });
        });

    };
}

function uploadMultipleMediaToS3(keys) {

    return function(req, res, next) {

        var files = _fetchMultipleFilesFromReq(req, keys);
        if (!files) {
            return next();
        }

        promise.mapSeries(files, function (file) {
            return mediaUploadService.uploadToS3(options.cfg.s3.bucketName, String(seq++ + path.extname(file.originalname)), file.path, file.fieldname);
        })
        .then(function (urls) {
            urls.forEach(function (url) {
                if(url.field=="profilePic") {
                    req.body.profilePicUrl = url.location;
                } else {
                    req.body.bannerPicUrl = url.location;
                }
            });
            next();
        })
        .catch(function (err) {
            throw err;
        });
    };
}


// var uploadMediaWithThumbnail = function uploadMediaWithThumbnail(files){
//     var file = files[0];
//     if (req.body.type == 1) {
//         let firstThumb = imageProcessing.createImageThumb(file, 100, 100);
//         let secondThumb = imageProcessing.createImageThumb(file, 400, 230);
//         return Promise.join(firstThumb, secondThumb)
//             .bind({})
//             .then(function (result) {
//                 let params = {Bucket: options.cfg.s3.bucketName, Key: String(seq++ + path.extname(file.originalname)), Body: fs.createReadStream(file.path), ACL : options.cfg.s3.ACL};
//                 let thumb1 = {Bucket: options.cfg.s3.bucketName, Key: String(seq++ + path.extname(result[0].filename)), Body: fs.createReadStream(result[0].path), ACL : options.cfg.s3.ACL};
//                 let thumb2 = {Bucket: options.cfg.s3.bucketName, Key: String(seq++ + path.extname(result[1].filename)), Body: fs.createReadStream(result[1].path), ACL : options.cfg.s3.ACL};
//                 s3.upload(params, function (err, data) {
//                         if (!data) {
//                             throw  ex
//                             this.mediaPath = data.Location;
//                         }
//                         __deleteFiles(_.map(files, 'path'));
//                         next();
//                     })
//                     .then(function(){

//                     })

//                 media.thumbnail_100x100 = config.cfg.protocol + '://' + config.cfg.ip + ':' + config.cfg.port + '/images/' + result[0].filename;
//                 media.thumbnail_400x230 = config.cfg.protocol + '://' + config.cfg.ip + ':' + config.cfg.port + '/images/' + result[1].filename;
//                 params.media = media;
//                 return postService.updateMedia(params)
//             })
//             .catch(function (err) {
//                 throw err;
//             })
//     } else {
//         let firstThumb = imageProcessing.createVideoThumb(file, 100, 100);
//         let secondThumb = imageProcessing.createVideoThumb(file, 400, 230);
//         return Promise.join(firstThumb, secondThumb)
//             .then(function (result) {
//                 console.log(result);
//                 media.thumbnail_100x100 = config.cfg.protocol + '://' + config.cfg.ip + ':' + config.cfg.port + '/images/' + result[0].filename;
//                 media.thumbnail_400x230 = config.cfg.protocol + '://' + config.cfg.ip + ':' + config.cfg.port + '/images/' + result[1].filename;
//                 params.media = media;
//                 return postService.updateMedia(params)
//             })
//             .catch(function (err) {
//                 throw err;
//             })

//     }
// }

function _fetchFilesFromReq(req) {

    if(req.file) {
        return [ req.file ];
    } else if(req.files) {
        return req.files;
    } else {
        //No Data
    }
}

function _fetchMultipleFilesFromReq(req, keys) {

    if(req.file) {
        return [ req.file ];
    } else if(req.files) {
        var filesArr = [];
        keys.forEach(function (key) {
            if(req.files[key]) {
                filesArr.push(req.files[key][0]);
            }
        });
        return filesArr;
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
        .then(  () => logger.info( TAG , "All Files Deleted Successfully"))
        .catch(  err => logger.error( err ));
}
