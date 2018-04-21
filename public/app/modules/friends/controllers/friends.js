define(['modules/friends/module','angucomplete-alt'], function (module,io) {


module.registerController('friendsCtrl',function($scope,notificationService,Authorization,$state,User,fileUploadService,$rootScope,$q){

  var checkAvailability = Authorization.checkAvailability();

  if(checkAvailability){

  	 try{
        $scope.currentUser =  JSON.parse(User.getUserInfo()) ;

      }catch(e){
        $scope.currentUser =  User.getUserInfo() ;
    }

   $scope.selectedChat=[]
   $scope.listFriends = []
   var init = function(){
   $q.all([Authorization.getRooms(),Authorization.viewAll()]).then(function(data){
           $scope.listFriends =  data[0].data.response.result;
           $scope.findFriends = data[1].data.response.result;
           // console.log($scope.listFriends)
                }).catch(function(){
                 notificationService.error();
              });

   }
  	
init();


  $scope.localSearch = function(str) {
  	var matches = [];
 		$scope.findFriends.forEach(function(person) {
    if (person.fullName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) {
      matches.push(person);
   		 }
 		 });
  		return matches;
};		

$scope.selectedFriend = function(val){
	try{
		if(val.originalObject._id){
			var data={
				  "chatType": "PERSONAL",
				  "members": [
				   val.originalObject._id
				  ]
				}
			$q.all([Authorization.createRoom(data)]).then(function(data){
          	init();
           // console.log($scope.listFriends)
                }).catch(function(){
                 notificationService.error();
              });

		}
	
	}catch(e){
	console.log();
}
}	


  }else{
        
            $state.transitionTo('login')
  }

});

})