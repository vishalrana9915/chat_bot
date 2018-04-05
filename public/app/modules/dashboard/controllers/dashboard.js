define(['modules/dashboard/module','io'], function (module,io) {


module.registerController('dashboardCtrl',function($scope,notificationService,Authorization,$state,User){

  var checkAvailability = Authorization.checkAvailability();

  if(checkAvailability){
        $("#focusget").focus();





        $scope.currentUser = JSON.parse(User.getUserInfo());

        Authorization.dailyUpdate().then(function(data){
           $scope.dailyUpdate= data.data.response.result;
                }).catch(function(){
                  $state.transitionTo('login')
              });
        var socket = io.connect(appConfig.socketURL)
        let userInitial = window.localStorage.getItem('_identity')
        socket.emit('initChat',userInitial);
        socket.on('initComplete',function(msg){
        notificationService.confirmation(msg);
            })
  }else{
        $state.transitionTo('login')
  }



            
  
});

})