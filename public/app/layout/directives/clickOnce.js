/**
 * Created by Shawn Miller on 10/25/2015.
 * Path: public/app/layout/directives/clickOnce.js
 */
define(['layout/module'], function (module) {
	'use strict';
	module.registerDirective('clickOnce', function ($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var replacementText = attrs.clickOnce;

				element.bind('click', function() {
					$timeout(function() {
						if (replacementText) {
							element.html(replacementText);
						}
						element.attr('disabled', true);
					}, 0);
				});
			}
		}
	});
});
