/**
 * Created by Pancham Bhagwat on 07/31/2015.
 * Path: public/app/layout/filters/filterHtmlChars.js
 */
define(['layout/module'], function (module) {

	'use strict';

	module.registerFilter('filterHtmlChars', function () {
		return function (html) {

			if (!html || html.length == 0) {
				return html;
			}
			var anchorTagException = html.match("<a(.*?)<\/a>");


			var RandomString = function () {
				var text = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

				for (var i = 0; i < 5; i++) {
					text += possible.charAt(Math.floor(Math.random() * possible.length));
				}

				return text;
			};
			var firstRandomString = RandomString();
			var secondRandomString = RandomString();

			//
			html = html.replace(/<a/g, firstRandomString);
			html = html.replace(/<\/a>/g, secondRandomString);

			firstRandomString = new RegExp(firstRandomString, "g");
			secondRandomString = new RegExp(secondRandomString, "g");

			html = html.replace(/(<)/g, "&lt;");

			html = html.replace(firstRandomString, "<a");
			html = html.replace(secondRandomString, "</a>");

			if (!/\r|\n/.exec(html)) {
				return html;
			}

			html = '<p>' + html.replace(/(\r\n|\n|\r)/g, "&nbsp;</p><p>") + '</p>';
			return html;


			//TODO: Singh Build logic for double http tags
			//   StringWithAnchorTag = html.substr(html.indexOf('<a'), html.lastIndexOf('</a>'));
			// 	 StringWithoutAnchorTag = html.substr(html.indexOf('<a'), html.lastIndexOf('</a>'));
			//  StringWithAnchorInAnchorTag = html.substr(html.indexOf('<a')+2, html.indexOf('</a>')-2);
			//var count = (html.match(/<a(.*?)<\/a>/g || [])).length;

			//var randomString = RandomString();
			//html = html.trim();
			//html = ('<p>' + html.replace(/[\r\n|\n|\r]+/g,'</p><p>') + '</p>');
			//html = ('<p>' + html.replace(/[\n]+/g,'</p><p>') + '</p>');
			//html = ('<p>' + html.replace(/[\r]+/g,'</p><p>') + '</p>');
			//html = ('<p>' + html.replace(/[\r\n]+/g,'</p><p>') + '</p>');

			//html = (html.length > 0 ? '<p>' + html.replace(/[\r\n]+/,'</p><p>') + '</p>' :'<p></p>');
			//html = (html.length > 0 ? '<p>' + html.replace(/[\n]+/g,'</p><p>') + '</p>' :'<p></p>');
			//return html;

			//return html.replace(/<p><\/p>/g, '');
			//return html.replace(/<[^\/>][^>]*><\/[^>]+>/, '');
			//
			//var formattedHtml = '<p>' + html.replace(/(\n)/g,"</p>");
			//formattedHtml = formattedHtml.replace(/(\r)/g,"</p>");
			//formattedHtml = formattedHtml.replace(/(\r\n)/g,"<p>");
			//return formattedHtml;
			//return html.replace(/(\r\n|\n|\r)/g,"<p>");
			//var filtered = angular.element('<div>').html(html).text();
			//return filtered;
		}
	});
});