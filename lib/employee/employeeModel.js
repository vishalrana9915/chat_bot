// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');


var Schema = mongoose.Schema;
var Employee;

var EmployeeSchema = new Schema({
  firstName:{type:String,required:true},
  lastName : String,
  fullName : String,
  designation :{type: String,required:true},
  employeer:mongoose.Schema.Types.ObjectId,
  createdAt:{type:Date,default:Date.now},
  editAt:{type:Date,default:Date.now},
  status:{type:String,default:'ACTIVE',enum:['ACTIVE','INACTIVE','BLOCK']},
  recentActivity:[
      {
        assigneeName:String,
        assignDate:Date,
        totalAmount:Number,
        paymentMethod:String,
        paymentId:mongoose.Schema.Types.ObjectId,
        progress:String
      }
  ],
  WorkingStartTime:Number,
  workingEndTime:Number,
  workingTiming:{type:String,enum:['IST','US'],required:true},
  Notifications:[
  {
      topic:String,
      createAt:Date,
      sentBy:mongoose.Schema.Types.ObjectId,
      senderName:String,
      status:{type:String,default:'ACTIVE',enum:['ACTIVE','INACTIVE']}
  }
  ],
  Notification:{type:String,default:'ACTIVE',enum:['ACTIVE','INACTIVE']},
  blocked:[mongoose.Schema.Types.ObjectId],
  email:{type:String,required:true},
  mobileNumber:Number,
  chargePerDay :Number,
  reference:String,
  points:Number,
  accountDetails:[{
    cardNumber:String,
    cvv:String,
    expMonth:Number,
    expYear:Number,
    cardHolderName:String
  }],
  address:[
  {
    address1:String,
    address2:String,
    postalCode:Number,
    country:String,
    state:String,
    city:String
  }
  ]
     },
    {
        versionKey: false
    });

//Export user module
Employee = module.exports = mongoose.model(constants.DB_MODEL_REF.EMPLOYEE, EmployeeSchema);
