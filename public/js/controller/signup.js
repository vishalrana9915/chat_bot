app.controller('signupCtrl',function($scope,qualityControlSerevice,$state){
	var self  = $scope
 	self.obj={}

	self.signup = function(){

		if(self.obj.email !== self.reEmail){
			return alert("Email doesn't match.")
		}

		self.obj.dob = self.month+ '/'+ self.day+'/'+self.year
		console.log('displaying object ==>'+JSON.stringify(self.obj))


	qualityControlSerevice.postReq('register',self.obj)
		.then((result) =>{
			console.log("file==>"+JSON.stringify(result))
			alert(result.data.response.responseMessage)
			$state.transitionTo('login')
		} )
		.catch(e => console.log("JSON==>"+JSON.stringify(e)))
	}


	self.loginRoute = function(){
		$state.transitionTo('login')
	}

})