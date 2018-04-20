define(['modules/connect/module'], function (module,io) {


module.registerController('connectCtrl',function($scope,notificationService,Authorization,$state,User,fileUploadService){

  var checkAvailability = Authorization.checkAvailability();

  if(checkAvailability){

    var limitStep = 1;

    $scope.picture=[]
    
      try{
        $scope.currentUser =  JSON.parse(User.getUserInfo()) ;

      }catch(e){
        $scope.currentUser =  User.getUserInfo() ;
      }
       
      $scope.getNewFeeds = function(){
        Authorization.getFeeds().then(function(data){
           $scope.feeds =  data.data.response.result;
          angular.forEach($scope.feeds,function(val,index){
            var limitStart=true;
          angular.forEach(val.like,function(dat){
              if(dat.id === localStorage.getItem('_identity')){
                // console.log(dat.id)
                // console.log(localStorage.getItem('_identity'))
                if(limitStart){
                val.PartiallikeFeed = true;
                limitStart = false;
                }
              }else{
                val.PartiallikeFeed = false;
              }
            })           
          })
           $scope.correspondingImages = data.data.response.images;
                }).catch(function(){
                  $state.transitionTo('login')
              });
      }    
       $scope.getNewFeeds();
      var myVar = setInterval(function(){
           Authorization.checkDiff().then(function(data){
              if(data.data.response){
                    $scope.getNewFeeds();
              }
           }).catch(function(){
                  notificationService.error("Error")
              });
      },15000)

       $scope.$on('$destroy',()=>{
        clearInterval(myVar); 
       })


      // console.log("connect wise.");


      $scope.saveFeed = function(field){
        if($scope.content || $scope.picture){
          var data ={
              content:$scope.content,
              picture:$scope.picture || ""
            }
           

      Authorization.createFeeds(data)
        .then(function(response){
        $scope.content = "";
        $scope.picture=[];
        $scope.fileExist=false;
           $scope.getNewFeeds();
                }).catch(function(){
                  $state.transitionTo('login')
              });
              }else{
                notificationService.error("Provide some input");
              }

      }


    $scope.fileExist= false;
    $scope.uploadFile = function(){angular.element('#uploadFeed').click()};
    $scope.fileSelected = function(data){
      console.log(data.files)
      $scope.fileExist=true;
      $scope.formData =''
        Authorization.uploadFile(data.files["0"]).then(function(result){
          console.log(result)
          $scope.picture.push(result.data.response);
        }).catch(function(e){
          console.log(e)
      })


 
    }


    $scope.likeFeed = function(feedId){
      Authorization.likeFeed(feedId).then(function(result){
         console.log(result)
         $scope.getNewFeeds();
        }).catch(function(e){
          console.log(e)
      })
    }


    $scope.commentFeed = function(id){
      console.log(id)
      $scope.commentTrue=id
    }


    $scope.limit = limitStep;
      $scope.incrementLimit = function() {
          $scope.limit += limitStep;
      };
      $scope.decrementLimit = function() {
          $scope.limit -= limitStep;
      };

      $scope.commentingField = function(val,idx){
        console.log(val+idx)
        var idToBeComment = $scope.feeds[idx]._id;
        console.log(idToBeComment)
        var content= {
          comment:val
        }
        Authorization.commentFeed(idToBeComment,content).then(function(result){
         console.log(result)
         $scope.commentField=""
         $scope.getNewFeeds();
        }).catch(function(e){
          console.log(e)
      })
      };

      $scope.likeing = function(dadta){
        console.log(dadta)
      }


  }else{
        $state.transitionTo('login')
  }

});

})