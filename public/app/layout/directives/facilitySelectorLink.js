/**
 * Created by Shawn Miller on 5/19/2015.
 * Path: public/app/layout/directives/facilitySelectorLink.js
 */
define(['layout/module', 'jquery'], function (module, $) {

	'use strict';

	$.root_ = $('body');
	var root = window;


	var fadeAnimation = 450;

	module.registerDirective('facilitySelectorLink', function ($log, DefaultApiService, $location, systemRefreshService, $state, $timeout, $rootScope) {

		var link = function (scope, element) {

			if (appConfig.facility_selector) {

				// CREATE DYNAMIC MODAL INSTANCE
				var modal = $('<div id="facilityModal" class="modal fade"tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"></div></div></div>');


				// ATTACH MODAL TO BODY
				modal.appendTo("body");

				scope.facilitySelected = 'disabled';

				//INITIALIZE FACILITIES SELECT OPTIONS
				scope.facilities = [];

				DefaultApiService.readObjectCall('Facilities', 'Lookup')
					.success(function (facilities) {
						scope.removeCurrentFacility(facilities);
					});


				element.on("click", function (e) {

					//MAKE THE CALL IF ARRAY IS NOT POPULATED.
					if ((systemRefreshService.getFacilitiesRefreshFlag()) || (scope.facilities.length < 1)) {
						DefaultApiService.readObjectCall('Facilities', 'Lookup')
							.success(function (facilities) {
								scope.removeCurrentFacility(facilities);
								systemRefreshService.resetFacilityFreshFlag();
							});
					}

					//FADE IN DURATION
					$('#facility-btn .popover').fadeIn(fadeAnimation);

					e.preventDefault();
				});

				scope.removeCurrentFacility = function (facilities) {
					scope.facilities = _.remove(facilities, function (facility) {
						if (scope.user) {
							return facility.id != scope.user.curFacilityId;
						}
						return facility;
					});
				};

				$(document).mouseup(function (e) {

					if (!$('#facility-btn .popover').is(e.target) && $('#facility-btn .popover').has(e.target).length === 0) {
						var ignoreClassList = ['select2-results__option', 'select2-search__field', 'select2-results__options']
						var ignoreFade = false;

						_.forEach(ignoreClassList, function (classItem) {
							if (e.target.classList.contains(classItem)) {
								ignoreFade = true;
							}
						});

						if (!ignoreFade) {
							$('#facility-btn .popover').fadeOut(fadeAnimation);
						}
					}

					var $eventSelect = $("#cboFacilitySelector");
					$eventSelect.on("select2:close", function (e) {
						e.preventDefault();
						$('#set-facility-btn').focus();
						//$(this).next("#set-facility-btn").focus();
					});


				});

				//*****************************************************//
				//** BUTTON CLICK FACILITY SET                       **//
				//*****************************************************//
				$("#set-facility-btn").on("click", function () {
					scope.changeFacility();
				});

				//*****************************************************//
				//** BUTTON CLICK FACILITY CLOSE                     **//
				//*****************************************************//
				$("#close-facility-btn").on("click", function () {
					$('#facility-btn .popover').fadeOut(fadeAnimation);
				});

				//*****************************************************//
				//** BUTTON CLICK FACILITY HELP                      **//
				//*****************************************************//

				$("#facility-help-btn").on("click", function () {
					commands.help();
				});

			}
			else {
				//HIDE FACILITY BUTTON
				$("#facility-btn").addClass("display-none");
			}

			//CHANGE FACILITY BUTTON.
			function changeFacilityReload() {
				$location.path('/');
				return true;
			}


			scope.changeFacility = function () {

				DefaultApiService.changeFacility(scope.facility.id)
					.then(function () {
						//Refresh Session.
						localStorage.clear();
						localStorage.setItem('CurrentFacilityId', scope.facility.id);

						if ($location.path() == '/')
							location.reload();
						$('#facility-btn .popover').fadeOut(fadeAnimation);
						if ($rootScope.isFireFox) {
							$location.path('/');
							scope.$on('$locationChangeSuccess', function () {
								location.reload();
							});
						}
						else if ($rootScope.isChrome) {
							scope.$$watchers = [];
							$location.path('/');
							$rootScope.facilityChanged = true;
						}
						else {
							$location.path('/');
							location.reload();
						}


					});
			};

		};//eo variable link

		return {
			restrict: 'AE',
			link    : link
		}
	});

});
