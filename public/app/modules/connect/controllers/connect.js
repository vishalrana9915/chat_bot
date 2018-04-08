define(['modules/connect/module'], function (module,io) {


module.registerController('connectCtrl',function($scope,notificationService,Authorization,$state,User){

  var checkAvailability = Authorization.checkAvailability();

  if(checkAvailability){
      try{
        $scope.currentUser =  JSON.parse(User.getUserInfo()) ;

      }catch(e){
        $scope.currentUser =  User.getUserInfo() ;
      }
             
       Authorization.getFeeds().then(function(data){
           $scope.feeds =  data.data.response;
                }).catch(function(){
                  $state.transitionTo('login')
              });


      console.log("connect wise.");
  }else{
        $state.transitionTo('login')
  }
});

})