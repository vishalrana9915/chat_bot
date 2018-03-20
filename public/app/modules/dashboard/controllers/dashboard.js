define(['modules/dashboard/module','io'], function (module,io) {


module.registerController('dashboardCtrl',function($scope){


  
            socket.on('hi',function(data){
                console.log('socket connected for '+data.name)
            })


});

})