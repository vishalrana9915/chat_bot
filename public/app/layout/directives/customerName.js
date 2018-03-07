define(['layout/module'], function (module) {

    'use strict';

    module.registerDirective('customerName', function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attributes) {
                var customerName = scope.$eval(attributes.customerName);
                var strLastName, strFirstName, strName;
                strName = "";

                strLastName = (customerName.lastName)? customerName.lastName.trim(): '';

                strFirstName = (customerName.firstName)? customerName.firstName.trim() : '';

                strName += (strLastName) ? strLastName : '';

                strName += (strFirstName) ? (strLastName ? ', ' + strFirstName: strFirstName): '';

                element[0].innerHTML = strName.trim();
            }
        }
    });
});
