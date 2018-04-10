define(['modules/connect/module'], function (module,io) {


module.registerController('connectCtrl',function($scope,notificationService,Authorization,$state,User){

  var checkAvailability = Authorization.checkAvailability();

  if(checkAvailability){














    
      try{
        $scope.currentUser =  JSON.parse(User.getUserInfo()) ;

      }catch(e){
        $scope.currentUser =  User.getUserInfo() ;
      }
       
      $scope.getNewFeeds = function(){
        Authorization.getFeeds().then(function(data){
           $scope.feeds =  data.data.response;
                }).catch(function(){
                  $state.transitionTo('login')
              });
      }    
      $scope.getNewFeeds();
      var myVar = setInterval(function(){
        $scope.getNewFeeds();
      },15000)

       $scope.$on('$destroy',()=>{
        alert("hello")
        clearInterval(myVar); 
       })


      console.log("connect wise.");


      $scope.saveFeed = function(field){
    var data ={
      content:field
    }
      Authorization.createFeeds(data).then(function(response){
        $scope.content = ""
           $scope.getNewFeeds();
                }).catch(function(){
                  $state.transitionTo('login')
              });


  }


























  }else{
        $state.transitionTo('login')
  }



  


});

})