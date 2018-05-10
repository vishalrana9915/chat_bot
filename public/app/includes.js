define([
	// user account & profile
	'auth/module',
	'auth/models/User',
	'auth/login/loginCtrl',
	'auth/signup/signupCtrl',
    'modules/dashboard/module',
    'modules/connect/module',
    'modules/friends/module',
    'layout/directives/header',
    'layout/directives/side',
    'modules/dashboard/controllers/dashboard',
    'modules/connect/controllers/connect',
    'modules/friends/controllers/friends',
	'layout/module',
	'layout/directives/customSpinner',
	'layout/directives/networkStatus',
	'layout/directives/fileinput',
	'layout/directives/enterDir',
	'layout/filters/imageFilter',
	'layout/filters/decryptMessage',
	'components/language/form-validation-key-service',

	// Language components & controller
	'components/language/Language',
	'components/language/languageSelector',
	'components/language/language-controller',


	//socket componenets

	'layout/service/socketService',
	'layout/service/buildInfo',
	'layout/service/notificationService',
	'layout/service/facilityRoutingService',
	'layout/service/notificationMessages',
	// 'layout/service/dtEncoderFactory',
	// Activities Working feature
	'components/activities/activities-controller',
	'components/activities/activities-dropdown-toggle-directive',
	'components/activities/activities-service',

	// Alerts Working feature
	'components/alerts/alerts-controller',
	'components/alerts/alerts-dropdown-toggle-directive',
	'components/alerts/alerts-service',

], function () {
	'use strict';
});
