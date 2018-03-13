define([

	//DefaultApiService - Default API Calls, GET, POST, PUT, DELETE.
	'layout/service/buildInfo',
	// 'modules/services/DefaultApiService',

	// user account & profile
	'auth/module',
	'auth/models/User',
	// 'auth/services/Authorization',
	'auth/login/loginCtrl',
	'auth/signup/signupCtrl',
    'auth/directives/loginAuth',
    'auth/directives/signupForm',
	// application layout
	'layout/module',
	'layout/directives/customSpinner',
	'layout/service/errorNotificationsService',
	'layout/service/SmartCss',
	'components/frontend-session-validations/userSessionService',
	'layout/directives/networkStatus',
	'components/language/form-validation-key-service',
	// 'layout/filters/localDateTimeFilter',
	'components/notifications/notificationFlyOut',

	// Language components & controller
	'components/language/Language',
	'components/language/languageSelector',
	'components/language/language-controller',


	//socket componenets

	'layout/service/socketService',

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
