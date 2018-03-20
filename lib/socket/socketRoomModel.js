// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');

/*var rootRef = firebase.database();*/

var Schema = mongoose.Schema;
var Room;

var roomSchema = new Schema({
  name:{ type: String}, 
  image:{type:String},
  chatType:{type:String,enum:["GROUP","PERSONAL"]},
  groupAdmin:{
    fullName:{type:String},
    profileImage:{type:String},
    adminId:{type:mongoose.Schema.Types.ObjectId}
  },
  isActive:{type:Number,default:1},
  created: {type: Number, default: Date.now},
  deleted:{type: Number,default:0},
  members:[mongoose.Schema.Types.ObjectId]
    },
    {
        versionKey: false
    });

//Export user module
Room = module.exports = mongoose.model(constants.DB_MODEL_REF.ROOM, roomSchema);

/*module.exports = rootRef*/
