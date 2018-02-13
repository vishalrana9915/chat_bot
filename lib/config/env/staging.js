module.exports = {
    environment: 'staging',
    port: 4009,
    protocol : 'http',
    TAG: "staging",
    mongo: {
        dbName: 'chat_bot',
        dbUrl: "mongodb://localhost:27017/"
        // options: {
        //     server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
        //     replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
        // }
    },
    
    swagger_port : 80,
    isStag: true,

    //Form Dynamic Values Depending on ENV
    form : function () {
        var swagger_port = this.swagger_port ? this.swagger_port : this.port;
        this.server_address = this.protocol + "://"+this.ip+":"+swagger_port;

    }
}
