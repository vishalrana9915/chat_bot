define(['modules/connect/module'], function (module,io) {


module.registerController('connectCtrl',function($scope,notificationService,Authorization,$state,User,fileUploadService){

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
        clearInterval(myVar); 
       })


      console.log("connect wise.");


      $scope.saveFeed = function(field){
        if($scope.content || $scope.formData){
          var data ={
              content:field
            }

            if($scope.content){
              Authorization.createFeeds(data)
            }else if($scope.formData && !$scope.content){
              Authorization.createFeeds(data)
            }

      Authorization.createFeeds(data).then(function(response){
        $scope.content = "";
        $scope.formData={}
           $scope.getNewFeeds();
                }).catch(function(){
                  $state.transitionTo('login')
              });
              }else{
                notificationService.error("Provide some input");
              }

  }




    $scope.uploadFile = function(){angular.element('#uploadFeed').click()};
    $scope.fileSelected = function(data){
    $scope.formData = fileUploadService.createFileFormData(data.files);
    }























  }else{
        $state.transitionTo('login')
  }



  


});

})