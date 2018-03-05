module.exports = {
    environment: 'production',
    port: 7822,
    protocol : 'http',
    TAG: "production",
    mongo: {
        dbName: 'chat_bot',
        dbUrl: "mongodb://localhost:27017/"
    },
   

    
    swagger_port : 80,
    isProd: true,

    //Form Dynamic Values Depending on ENV
    form : function () {
        var swagger_port = this.swagger_port ? this.swagger_port : this.port;
        this.server_address = this.protocol + "://"+this.ip+":"+swagger_port;

    }
};
