// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');

/*var rootRef = firebase.database();*/

var Schema = mongoose.Schema;
var Connect;

var ConnectSchema = new Schema({
  picture:[String],
  content:{type: String},
  senderInfo:{
    fullName:String,
    profileImage:String,
    id:String,
    email:String
  },
  like:[{
    fullname:String,
    id:String,
    profileImage:String
  }],
  comment:[{
    fullname:String,
    id:String,
    profileImage:String,
    text:String,
    likedBy:[{
      name:String,
      id:String
    }],
    tag:[String]
  }],
  createdAt:{type:Date,default:Date.now},
  isActive:{type:Number,default:1},
  isView:[{
    fullname:String,
    id:String,
    profileImage:String
  }],
  privileged:[String],
  status:{type:String,default:"PUBLIC"},
  modifiedAt:{type:Date,default:Date.now},
  share:[String],
  tag:[String]
    },
    {
        versionKey: false
    });

//Export user module
Connect = module.exports = mongoose.model(constants.DB_MODEL_REF.CONNECT, ConnectSchema);
