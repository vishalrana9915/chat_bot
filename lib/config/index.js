const _ = require("lodash");
const dbConfig = require("./dbConfig");
const expressConfig = require("./expressConfig");
const path = require("path");
var envConfig = {};
var cfg = {};
var environment = process.env.NODE_ENV || 'dev';
process.env.NODE_ENV = environment;
//ENV Config
switch (environment) {
    case 'dev' :
    case 'development' :
        envConfig = require('./env/development');
        break;
    case 'prod' :
    case 'production' :
        envConfig = require('./env/production');
        break;
    case 'stag' :
    case 'staging' :
        envConfig = require('./env/staging');
        break;

}

var defaultConfig = {
    environment: "development",
    ip: 'localhost',
    port: 4009,
    protocol : 'http',
    TAG: "development",
    uploadDir : path.resolve("./uploads"),
    mongo: {
        dbName: 'chat_bot',
        dbUrl: "mongodb://localhost:27017/",
        options:{
            user:"Vinn_Rana",
            pass:"vinn2771"
        }
    },
    // redis: {
    //     server: '127.0.0.1',
    //     port: 6379
    // },
    // twitter: {
    //     key: "SIEaZS7R9K6CWjhGLOcPIK4Xn",
    //     secret: "3FEcwI1lCVlq4WR9OIdUAfAOURgWbbgrATpfzN8k7ZZ0CyasTH",
    //     callback: "http://dev.algoworks.com:8050"
    // },
    // twilio : {
    //     ACCOUNT_SID : 'ACcf6b111273c31fccf1eac48d02fed9e5',
    //     AUTH_TOKEN : '709865372af79c05047f42113cdf7c58',
    //     TWILIO_NUMBER : '+12482434047',
    // },

    iamUser : {
       accessKey : 'O0OD6vwqVSy/czlPHl3WjUcH7Fnng3V7IXrkyDZW',
        keyId : 'AKIAJWRJBAJOUCDOBMPQ',
    },

    // cloudFront : {
    //     publicDomain : "d3fqifl7ma1i47.cloudfront.net",

    //     domain : 'd3kkgb7o9ki7ct.cloudfront.net',
    //     keyPair : "APKAIRJTDAMTY6H5LCHA",
    //     privateKeyPath : path.resolve( __dirname , '../../resources/private.pem')
    // },

    // option parameters constantys for s3
    // s3 : {
    //     maxAsyncS3: 20,     // this is the default
    //     s3RetryCount: 3,    // this is the default
    //     s3RetryDelay: 1000, // this is the default
    //     multipartUploadThreshold: 20971520, // this is the default (20 MB)
    //     multipartUploadSize: 15728640, // this is the default (15 MB)
    //     bucketName : "shineapp/banners",
    //     publicBucketName : "shineapp",
    //     signatureVersion: 'v2',
    //     region: "us-west-2",
    //     ACL : 'public-read'
    // },

    swagger_port : 80,

    //Form Dynamic Values Depending on ENV
    form : function () {
        var swagger_port = this.swagger_port ? this.swagger_port : this.port;
        this.server_address = this.protocol + "://"+this.ip+":"+swagger_port;
    }
};
//Create Final Config JSON by extending env from default
var cfg = _.extend(defaultConfig, envConfig);


//Export config module
module.exports = {
    cfg,
    dbConfig,
    expressConfig
};
