app.service('qualityControlSerevice',function($q,$http){

	var self  = this;

	var baseUrl ='http://localhost:4009/chat_bot/api/v1/user/'

	this.postReq = function(url,data){



		// var	reqObj = {
		// 		"url" : baseUrl + url,
		// 		"method": 'POST',
		// 		"Content-Type" : 'application/json',
		// 		"data" : data
		// }
		var absolutePath = baseUrl+url
		// console.log("modified object==>"+JSON.stringify(reqObj))
		var defer = $q.defer()
		$http.post(absolutePath,data).then(function successCallback(success){
			defer.resolve(success)
		},function errorCallback(error){
			defer.reject(error)
		})
		return defer.promise;
	}



})