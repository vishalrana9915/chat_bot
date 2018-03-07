/**
 * Created by Shawn Miller on 5/19/2015.
 * Path: public/app/layout/directives/facilitySelector.js
 */
define(['layout/module', 'jquery', 'select2'], function (module, $) {

	'use strict';

	$.root_ = $('body');
	var root = window;

	module.registerDirective('facilitySelector', function ($log) {

		var link = function(scope, element) {

			if (appConfig.facility_selector) {

				// create dynamic modal instance
				var modal = $('<div id="facilityModal" class="modal fade"tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"></div></div></div>');

				// attach to body
				modal.appendTo("body");

				element.on("click", function(e) {
					$('#facility-btn .popover').fadeIn(350);
					e.preventDefault();
				});

				/*
				 Remove popover

				 Check the current matched set of elements against a selector, element, or jQuery object and return
				 true if at least one of these elements matches the given arguments.

				 Reduce the set of matched elements to those that have a descendant that matches the selector or
				 DOM element.
				 */
				$(document).mouseup(function(e) {
					if (!$('#facility-btn .popover').is(e.target) && $('#facility-btn .popover').has(e.target).length === 0) {
						$('#facility-btn .popover').fadeOut(250);
					}
				});

				$("#facility-help-btn").on("click", function() {
					commands.help();
				});

			}
			else {
				$("#facility-btn").addClass("display-none");
			}

		}//eo variable link

		return {
			restrict: 'AE',
			//replace: true,
			//templateUrl: 'app/layout/partials/facility-selector.tpl.html',
			link: link
		}
	});

});
