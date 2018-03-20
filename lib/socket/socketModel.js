// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');

/*var rootRef = firebase.database();*/

var Schema = mongoose.Schema;
var Chat;

var ChatSchema = new Schema({
  roomId:{type:mongoose.Schema.Types.ObjectId,ref:constants.DB_MODEL_REF.ROOM},
  message:{type:String},
  messageType:{type:String,enum:["TEXT","IMAGE","VIDEO"]},
  senderDetails:{
    fullName:{type:String},
    profileImage:{type:String},
    senderId:String
  },
  recieverDetails:{
    fullName:String,
    profileImage:String,
    recieverId:String
  },
  isActive:{type:Number,default:1},
  created: {type: Number, default: Date.now}
    },
    {
        versionKey: false
    });


// UserSchema.methods.toJSON = function () {
//     var obj = this.toObject();
//     delete obj.isActive;
//     delete obj.created;
//     return obj;
// };
//Export user module
Chat = module.exports = mongoose.model(constants.DB_MODEL_REF.CHAT, ChatSchema);

/*module.exports = rootRef*/
