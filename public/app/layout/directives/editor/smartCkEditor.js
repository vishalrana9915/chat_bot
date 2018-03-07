/**
 * Created by Shawn Miller on 6/19/2015.
 * Path: public/app/layout/directives/editor/smartCkEditor.js
 */
define(['layout/module', 'ckeditor'], function (module) {

    'use strict';

    module.registerDirective('smartCkEditor', function () {
        return {
            require: '?ngModel',
            link: function(scope, elm, attr, ngModel) {
                var ck = CKEDITOR.replace(elm[0]);

                if (!ngModel) return;

                ck.on('pasteState', function() {
                    scope.$apply(function() {
                        ngModel.$setViewValue(ck.getData());
                    });
                });

                ngModel.$render = function(value) {
                    ck.setData(ngModel.$viewValue);
                };
                //elm.removeAttr('smart-ck-editor data-smart-ck-editor');
                //CKEDITOR.replace( elm.attr('name'), {
                //            height: '380px',
                //            toolbar : 'Basic',
                //            uiColor : '#9AB8F3',
                //            startupFocus : true
                //        } );
            }
            //restrict: 'A',
            //compile: function ( tElement) {
            //    tElement.removeAttr('smart-ck-editor data-smart-ck-editor');
            //
            //    CKEDITOR.replace( tElement.attr('name'), {
            //        height: '380px',
            //        toolbar : 'Basic',
            //        uiColor : '#9AB8F3',
            //        startupFocus : true
            //    } );
            //}
        }
    });
});
