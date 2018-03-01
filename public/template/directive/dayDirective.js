app.directive('dayDir',function(){

return {
	restrict: 'E',
	template:'<select class="form-control" ng-model="day">'+
                        '<option value="">Day</option>' +
                        '<option ng-repeat="data in dayObj" ng-bind="data" value="{{data}}"></option>'+
                    '</select>',

     link:function(scope,attribute){
     	
     	scope.dayObj=[]

	for(var i=1;i<32;i++){
     		scope.dayObj.push(i)
     	}

     }               
}

})