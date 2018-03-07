/**
 * Created by Shawn Miller on 1/13/2016.
 * Reference: public/app/layout/directives/jquiAccordion.js
 */
define(['layout/module', 'jquery-ui'], function (module) {

	'use strict';

	module.registerDirective('jquiAccordion', function () {

		//var expandLink, headers, contentAreas;

		return {
			restrict: 'A',
			link: function (scope, element, attributes) {

				element.accordion({
					//See http://api.jqueryui.com/accordion/
					autoHeight: true,
					heightStyle: "content",    //controls the height of the accordion and each panel.
					collapsible: true,         //whether all the sections can be closed at once. Allows collapsing the active section.
					animate: 600,              //milliseconds with default easing.
					icons: {
						header: "fa fa-plus",           // custom icon class
						activeHeader: "fa fa-minus"     // custom icon class
					},
					header: "h4"
				});


				/*

				// placement of these variables are important
				expandLink      = $('accordion-expand-all');
				headers         = $('#accordion .ui-accordion-header');
				contentAreas    = $('#accordion .ui-accordion-content');

				// add the accordion functionality
				headers.click(function() {
					var panel = $(this).next();
					var isOpen = panel.is(':visible');

					console.log("var isOpen: " + isOpen )


					// open or close as necessary
					// trigger the correct custom event
					panel[isOpen? 'slideUp': 'slideDown']()

						.trigger(isOpen? 'hide': 'show');

					// stop the link from causing a pagescroll
					return false;
				});

				// hook up the expand/collapse all
				expandLink.click(function(){
					var isAllOpen = $(this).data('isAllOpen');

					contentAreas[isAllOpen? 'hide': 'show']()
						.trigger(isAllOpen? 'hide': 'show');
				});

				// when panels open or close, check to see if they're all open
				contentAreas.on({
					// whenever we open a panel, check to see if they're all open
					// if all open, swap the button to 'Collapse All'
					show: function(){
						//Check to see if all panels are open
						var isAllOpen = !contentAreas.is(':hidden');

						//Change the label
						if(isAllOpen){
							expandLink.text('Collapse All')
								.data('isAllOpen', true);
						}
					},

					// whenever we close a panel, check to see if they're all open
					// if not all open, swap the button to expander
					hide: function(){
						var isAllOpen = !contentAreas.is(':hidden');
						if(!isAllOpen){
							expandLink.text('Expand all')
								.data('isAllOpen', false);
						}
					}
				});

				*/

			}
		}

	});
});