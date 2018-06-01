var chai = require('chai');
var chaiHttp =require('chai-http');
var expect = chai.expect;
var logger = require('../lib/logger');

chai.use(chaiHttp)
// var expect = require('chai').expect;

var request = require('request');
var serve = require("../lib/appHttpClient");
var token =''
var baseUrl= 'http://localhost:4009';
var path=''
describe('checking basic login request',()=>{

		it('test cases for post request',()=>{
			 path ='/chat_bot/api/v1/user/login'
			var body ={"email":"vishal@gmail.com","password":"qwerty"}
			 chai.request(baseUrl).post(path).send(body).end((err,res)=>{
			 	token = res.body.response.accessToken;
			 	expect(res).to.have.responseCode(200);
			 })
		});
		

		it("will get daily activity request",()=>{
		 path ='/chat_bot/api/v1/user/dailyActivity';
		 token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidmlzaGFsIHJhbmEiLCJ1c2VySWQiOiI1YWRiOGQ2MWZjNTU1NDMxZGM0YjJjZmYiLCJlbWFpbCI6InZpc2hhbEBnbWFpbC5jb20iLCJpYXQiOjE1Mjc3OTYyMDgsImV4cCI6MTUyNzgxNDIwOH0.rn5QdKr6A8bHpBnTYMZ4y7kLEzOGzr6ZOnY_3KeejXk"
			chai.request(baseUrl).get(path).set('authorization',token).end((err,res)=>{
			 	token = res.body.response.accessToken;
			 	expect(res).to.have.responseCode(200);
			 })
		})
})