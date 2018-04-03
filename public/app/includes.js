define([
	// user account & profile
	'auth/module',
	'auth/models/User',
	'auth/login/loginCtrl',
	'auth/signup/signupCtrl',
    // 'auth/directives/loginAuth',
    // 'auth/directives/signupForm',
    'modules/dashboard/module',
    // 'modules/dashboard/directives/header',
    // 'modules/dashboard/directives/footer',
    'modules/dashboard/controllers/dashboard',
	// application layout
	'layout/module',

	'layout/directives/customSpinner',
	'layout/directives/networkStatus',
	'components/language/form-validation-key-service',
	// 'components/notifications/notificationFlyOut',

	// Language components & controller
	'components/language/Language',
	'components/language/languageSelector',
	'components/language/language-controller',


	//socket componenets

	'layout/service/socketService',
	'layout/service/buildInfo',
	'layout/service/notificationService',
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
