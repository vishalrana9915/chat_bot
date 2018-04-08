define(['modules/dashboard/module','io'], function (module,io) {


module.registerController('dashboardCtrl',function($scope,notificationService,Authorization,$state,User){

  var checkAvailability = Authorization.checkAvailability();

  if(checkAvailability){
      try{
        $scope.currentUser =  JSON.parse(User.getUserInfo()) ;

      }catch(e){
        $scope.currentUser =  User.getUserInfo() ;
      }
        Authorization.dailyUpdate().then(function(data){
          if(Array.isArray(data.data.response.result)){
            $scope.dailyUpdate= data.data.response.result[0]
          }else{
           $scope.dailyUpdate= data.data.response.result;

          }
                }).catch(function(){
                  $state.transitionTo('login')
              });
        
  }else{
        $state.transitionTo('login')
  }
});

})