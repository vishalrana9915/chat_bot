// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');

/*var rootRef = firebase.database();*/

var Schema = mongoose.Schema;
var Count;

var CountSchema = new Schema({
    recordEntry:{type:Number},
    type:{type:String,enum:["REGISTER","LOGIN"]},
    users:[
        {
      userId:mongoose.Schema.Types.ObjectId,
      fullName:String,
      createdAt:Number,
      country:String
     }
    ],
    count:{type:Number,default:1},
    status:{type:String,default:'ACTIVE'},
    privileged:{type:Number,enum:[0,1]} // 0 is for slave and 1 is for master if we apply master slave thesis.
    },
    {
        versionKey: false
    });



//Export user module
Count = module.exports = mongoose.model(constants.DB_MODEL_REF.COUNT, CountSchema);

/*module.exports = rootRef*/
