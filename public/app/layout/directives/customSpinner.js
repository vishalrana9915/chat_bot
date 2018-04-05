/**
 * Created by Vishal rana .
 * Path: public/app/layout/directives/customSpinner.js
 * Notes: Directive for using the spin.js plugin
 */
define(['app', 'jquery', 'spinner-js', 'lodash'],
	function (module, $, Spinner, _) {
		'use strict';

		module.registerDirective('customSpinner', function ($rootScope) {
			return {
				restrict: 'EA',
				replace: true,

				link: function (scope, element, attributes) {
					var opts = {
						lines       : 13,           // The number of lines to draw
						length      : 28,           // The length of each line
						width       : 13,           // The line thickness
						radius      : 40,           // The radius of the inner circle
						scale       : 1,            // Scales overall size of the spinner
						corners     : 0.5,          // Corner roundness (0..1)
						color       : '#000',       // #rgb or #rrggbb or array of colors
						opacity     : 0.25,         // Opacity of the lines
						rotate      : 0,            // The rotation offset
						direction   : 1,            // 1: clockwise, -1: counterclockwise
						speed       : 1,            // Rounds per second
						trail       : 60,           // Afterglow percentage
						fps         : 20,           // Frames per second when using setTimeout() as a fallback for CSS
						zIndex      : 999,         // The z-index (defaults to 2000000000)
						className   : 'spinner',    // The CSS class to assign to the spinner
						top         : '43%',        // Top position relative to parent
						left        : '50%',        // Left position relative to parent
						shadow      : false,        // Whether to render a shadow
						hwaccel     : false,        // Whether to use hardware acceleration
						position    : 'absolute'    // Element positioning
					};

					var spinner = new Spinner(opts).spin();

					$rootScope.startSpinner = function () {

						$('#pageOverlay').removeClass("hidden");

						_.forEach(element[0].attributes, function (n, key) {
							if (opts[n.name]) {
								opts[n.name] = n.value;
							}
						});

						element[0].appendChild(spinner.el)
					};

					$rootScope.stopSpinner = function () {
						spinner.spin(false);
						$('#pageOverlay').addClass("hidden");
					};
				}

			}

		});

	});