module.exports = {
    environment: 'development',
    port: 4009,
    protocol : 'http',
    TAG: "development",
    mongo: {
        dbName: 'chat_bot',
        dbUrl: "mongodb://localhost:27017/",
/*Use these two lines wriiten below for replica sets*/

        // dbName: 'chat_bot?replicaSet=repl1',
        // dbUrl: "mongodb://localhost:27017,localhost:27018,localhost:27019/",
        options: {
            user:"Vinn_Rana",
            pass:"vinn2771"
            // server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
            // replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
        }
    },
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
    // iamUser : {
    //     accessKey : 'zS9da31x9+Kw+i0flTFpxC5cE1zEWH9uHroDrZVF',
    //     keyId : 'AKIAJ6L3U7P5W2LTLGQQ',
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
    isDev:true,

    //Form Dynamic Values Depending on ENV
    form : function () {
        var swagger_port = this.swagger_port ? this.swagger_port : this.port;
        this.server_address = this.protocol + "://"+this.ip+":"+swagger_port;
    }
};
