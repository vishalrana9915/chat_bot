// Initilize redis connection
// var redisClient = require("../redisClient/init");

// Load user routes
const usrRouter = require('../user/userRoute');

//Load connect feed route
const connectRouter = require('../connect/connectRoute');

// Load video routes

// const videoRouter = require('./video');
// Load category routes

// const categoryRouter = require('./category');
// Load response module

const responseHandler = require('../responseHandler');

//========================== Load Modules End ==============================================

//========================== Export Module Start ====== ========================

module.exports = function (app) {

    // Attach User Routes
    app.use('/chat_bot/api/v1/user', usrRouter);
    app.use('/chat_bot/api/v1/connect',connectRouter)

    // Attach ErrorHandler to Handle All Errors
    app.use(responseHandler.hndlError);
};
