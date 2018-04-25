define(['modules/friends/module','angucomplete-alt'], function (module,io) {


module.registerController('friendsCtrl',function($scope,notificationService,Authorization,$state,User,fileUploadService,$rootScope,$q){

  var checkAvailability = Authorization.checkAvailability();

  if(checkAvailability){

  	 try{
        $scope.currentUser =  JSON.parse(User.getUserInfo()) ;

      }catch(e){
        $scope.currentUser =  User.getUserInfo() ;
    }
   $scope.selectedChat=''
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
};

	$scope.createChat = function(data,roomId){
		$scope.selectedChat = data;
		$scope.currentRoomId= roomId;
		$scope.getChat(roomId);
		// $rootScope.$broadcast('getChat',roomId)

	}

	 $scope.successChat = function(chatData){
		$scope.currentChat = chatData;
		$scope.$apply()
		console.log($scope.currentChat)
	}



	 $scope.sendMessageLi = function(message){
	 	var data={
	 		
			  "roomId":$scope.currentRoomId,
			  "message": message,
			  "messageType": "TEXT",
			  "recieverDetails": {
			    "fullName": $scope.selectedChat.fullName,
			 "recieverId":$scope.selectedChat._id
			  }
			
	 	}
	 	$scope.chat_text=""
	 	$scope.sendMessageTo({sender:$scope.currentUser,details:data});
	 	// $rootScope.$broadcast('sendMessageTo',{sender:$scope.currentUser,details:data});
	 }


  }else{
        
            $state.transitionTo('login')
  }

});

})