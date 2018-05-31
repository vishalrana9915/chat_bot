var expect = require('chai').assert;
// var expect = require('chai').expect;
var serve = require("../lib/appHttpClient");
describe('basic test',()=>{

	describe('api test cases',()=>{
		it('checking test cases for get request',()=>{
			var hostname= 'localhost';
			var port = '4009'
			var path ='/chat_bot/api/v1/user/login'
			var body ={"email":"vishal@gmail.com","password":"qwerty"}
			 serve.post(hostname,port,path,body,(result)=>{
			 	expect.typeOf(result,'object','we are returning object');
			 })
			
		});


		it('checking post request',()=>{

		})
	});

	// describe('checking other function',()=>{
	// 	it("checking get request",()=>{
	// 		serve.get('http://localhost:4009/chat_bot/api/v1/user/dailyActivity',(response)=>{
	// 		expect(response).to.be.an('object')		
	// 		})
	// 	})
	// })
})