/**
 * Created by Dante Garcia on 4/15/2016.
 * Path: app/layout/directives/multiGrpSelectDropDown.js
 */
define(['../module',
	'lodash', 'select2'
], function (module) {

	'use strict';

	module.registerDirective('multiGrpSelectDropDown', function ($timeout) {
		return {
			restrict: 'EA',
			//templateUrl: 'app/layout/partials/multi-grp-select-drop-down.tpl.html',
			link: function (scope, element, attributes) {

			   /**********************************************************************
				*Initialize Select 2 for multi-group multi-selection drop down list. *
				**********************************************************************/
				var options = {
					theme: "bootstrap",
					placeholder: "-- Select --"
				};
				element.select2(options);

				var initSelect2 = function(){
					element.select2(options);
				};
				var refresh = function(){
					element.select2('destroy').select2(options);
				};

				scope.refreshSelect2 = function(){
					element.select2('destroy').select2(options);
				};

				scope.listenToModel = function(){
					initSelect2();
				};

				scope.$watch(attributes.ngModel, function(){
					refresh();
				});

				scope.listenToModel();

				/*******************************
				 *List and model manipulation. *
				 *******************************/
				scope.observePreSelection = function(){
					if(scope.preSelection.length > 0){
						scope.otherSelection = scope.preSelection;
					}
				};

				angular.element('#cboMultiSelectOther').on('select2:selecting', function(e, data){

					var selectedItems = $('#cboMultiSelectOther option:selected');

					_.forEach(selectedItems, function(selectedItem){
						if(selectedItem.parentElement.label == e.params.args.data.element.parentElement.label)
							angular.element("#cboMultiSelectOther option[value ='"+selectedItem.value+"']").prop("selected", false);
					});
				});

				var deselectAllValues = function(){

					if(scope.otherSelection.length > 0){
						for(var i=0;i<=2;i++)
							angular.element('.select2-selection__choice__remove').click();//Remove the selected items.
						angular.element('.select2-search__field').click();//Deselect DD menu.
					}
				};
				
				scope.deselectAll= function(){
					//$timeout(deselectAllValues(),1);
				};

				scope.$watch('otherSelection', function(){
					scope.otherObjectSelection = [];
					_.forEach(scope.otherSelection, function(selection){
						var objectSelection = _.find(scope.multiSelectorLists, function(listItem){
							return selection == listItem.value;
						});
						if(objectSelection)
							scope.otherObjectSelection.push(objectSelection);
					});
					scope.otherObjectSelection = _.uniq(scope.otherObjectSelection);
				});
			}
		}
	});
});


