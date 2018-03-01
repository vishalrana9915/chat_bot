app.directive('monthDir',function(){

return {
	restrict: 'E',
	template:'<select class="form-control" ng-model="month" >'+
                        '<option value="">Month</option>' +
                        '<option ng-repeat="data in monthObj" ng-bind="data.name" value="{{data.value}}"></option>'+
                    '</select>',

     link:function(scope,attribute){
     	scope.monthObj = [{name:"January",value:"01"},{name:"Febuary",value:"02"},{name:"March",value:"03"},{name:"April",value:"04"},{name:"May",value:"05"},{name:"June",value:"06"},{name:"July",value:"07"},{name:"August",value:"08"},{name:"September",value:"09"},{name:"October",value:"10"},{name:"Noverber",value:"11"},{name:"December",value:"12"}]


     }               
}

})