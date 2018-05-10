// Importing mongoose
var mongoose = require("mongoose");
var constants = require('../constants');


var Schema = mongoose.Schema;
var Jobs;

var JobSchema = new Schema({
  jobTitle:String,
  jobDescription:String,
  createdAt:{type:Date,default:Date.now},
  jobField:String,
  jobPrice:Number,
  jobType:{type:String,default:'P1',enum:['P1','P2','P3']},
  estimatingTime:Date,
  progress:{type:String,default:'Waiting',enum:['Waiting','Inprogress','Acknowledge','Complete','closed']},
  createdBy:{
    name:String,
    userId:mongoose.Schema.Types.ObjectId
  },
  assignTo:{
    name:String,
    assigneeId:mongoose.Schema.Types.ObjectId
  },
  comments:[
  {
    description:String,
    createDate:Date,
    editDate:Date,
    name:String,
    userId:String
  }]
     },
    {
        versionKey: false
    });

//Export user module
Jobs = module.exports = mongoose.model(constants.DB_MODEL_REF.JOBS, JobSchema);
