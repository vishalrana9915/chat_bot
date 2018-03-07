/**
 * Created by Shawn Miller on 3/28/2015
 * Filename: public/app/components/language/languageSelector.js
 */
define(['app'], function (module) {
    "use strict";

    module.registerDirective('languageSelector', function (Language) {
        return {
            restrict   : "EA",
            replace    : true,
            templateUrl: "app/components/language/language-selector.tpl.html",
            scope      : true,
        }
    })
});
