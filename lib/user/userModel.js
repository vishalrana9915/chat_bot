// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');

/*var rootRef = firebase.database();*/

var Schema = mongoose.Schema;
var User;

var UserSchema = new Schema({
  fullName:{ type: String,required: true},
  firstName: { type: String, trim: true, required: true },
  lastName:{type:String},
  email: { type: String, unique: true, lowercase: true, trim: true },
  mobile:{type:String},
  dob:{type:Date},
  sex:{type:String},
  password:{type:String,required:true},
  profileImage:{type:String},
  socialId:{type:String},
  socialType:{type:String},
  deviceToken:{type:String},
  isOrganizer:{type:Number},
  isActive:{type:Number,default:1},
  isBlock: {status:Number,blockBy:{type:Schema.Types.ObjectId}},
  created: {type: Number, default: Date.now},
  updated: {type: Number, default: Date.now},
  friends:[mongoose.Schema.Types.ObjectId],
  pushNotification:{type:Number,enum:[1,0]},
  friendRequest:[{
    name:String,
    sentAt:Date,
    imageProfile:String,
    userId:String,
    status:{type:String,default:'ACTIVE',enum:['ACTIVE','REJECT']}
  }],
  notifications:[{
    type:{type:String,enum:['FRIENDREQUEST','MESSAGE']},
    content:{type:String},
    status:{type:String,enum:['PENDING','ACCEPTED','REJECT'],default:'PENDING'},
    createdAt:{type:Number,default: Date.now},
    sender:{
      name:{type:String},
      userId:{type:mongoose.Schema.Types.ObjectId}
    }
  }],
    favourite:[
    {
      name:String,
      userId:mongoose.Schema.Types.Object
    }]
    },
    {
        versionKey: false,strict: false
    });


UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.isActive;
    delete obj.created;
    delete obj.updated;
    return obj;
};
//Export user module
User = module.exports = mongoose.model(constants.DB_MODEL_REF.USER, UserSchema);

/*module.exports = rootRef*/
