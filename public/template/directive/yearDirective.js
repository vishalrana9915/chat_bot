app.directive('yearDir',function(){

return {
	restrict: 'E',
	template:'<select class="form-control" ng-model="year">'+
                        '<option value="">Year</option>' +
                        '<option ng-repeat="data in yearObj" ng-bind="data" value="{{data}}"></option>'+
                    '</select>',

     link:function(scope,attribute){
     	
     	scope.yearObj=[]

	for(var i=2018;i>1965;i--){
     		scope.yearObj.push(i)
     	}

     }               
}

})