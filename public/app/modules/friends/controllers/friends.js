define(['modules/friends/module','angucomplete-alt'], function (module,io) {


module.registerController('friendsCtrl',function($scope,notificationService,Authorization,$state,User,fileUploadService){

  var checkAvailability = Authorization.checkAvailability();

  if(checkAvailability){

  	 try{
        $scope.currentUser =  JSON.parse(User.getUserInfo()) ;

      }catch(e){
        $scope.currentUser =  User.getUserInfo() ;
    }



  $scope.friends = [{firstName:"vishal",lastName:"rana",age:"22"},{firstName:"robin",lastName:"suraj",age:"24"},{firstName:"uv",lastName:"v",age:"24"},{firstName:"shubham",lastName:"yadav",age:"24"}]

  $scope.localSearch = function(str) {
  var matches = [];
  $scope.friends.forEach(function(person) {
    var fullName = person.firstName + ' ' + person.lastName;
    if ((person.firstName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
        (person.lastName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
        (fullName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
      matches.push(person);
    }
  });
  console.log(matches[0])
  return matches;
};		



  }else{
        
            $state.transitionTo('login')
  }

});

})