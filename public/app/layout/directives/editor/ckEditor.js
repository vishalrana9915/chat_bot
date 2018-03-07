/**
 * Created by Shawn Miller on 6/19/2015.
 * Path: public/app/layout/directives/editor/smartCkEditor.js
 */
define(['layout/module', 'ckeditor'], function (module) {

    'use strict';

    module.registerDirective('ckEditor', function () {
        return {
            restrict: 'A',
            compile: function ( tElement) {
                tElement.removeAttr('ck-editor data-ck-editor');



                CKEDITOR.replace( tElement.attr('name'), { height: '380px', startupFocus : true} );
            }
        }
    });
});
