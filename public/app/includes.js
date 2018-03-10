define([

	//DefaultApiService - Default API Calls, GET, POST, PUT, DELETE.
	'layout/service/buildInfo',
	// 'modules/services/DefaultApiService',

	// user account & profile
	'auth/module',
	'auth/models/User',
	// 'auth/services/Authorization',
	'auth/login/loginCtrl',
	// application layout
	'layout/module',
	// 'layout/service/customerLoyaltyService',
	// 'layout/directives/customerName',
	// 'layout/actions/minifyMenu',
	// 'layout/actions/toggleMenu',
	// 'layout/actions/fullScreen',
	// 'layout/actions/resetWidgets',
	// 'layout/actions/searchMobile',
	// 'layout/directives/access-level-buttons',
	// 'layout/filters/distanceFilter',
	// 'layout/filters/pressColorFilter',
	// 'layout/filters/carriageReturnFilter',
	// 'layout/filters/customerNameLnFnParsing',
	// 'layout/directives/demo/demoStates',
	// 'layout/directives/smartInclude',
	// 'layout/directives/smartDeviceDetect',
	// 'layout/directives/smartFastClick',
	// 'layout/directives/smartLayout',
	// 'layout/directives/smartSpeech',
	// 'layout/directives/smartRouterAnimationWrap',
	// 'layout/directives/smartFitAppView',
	// 'layout/directives/radioToggle',
	// 'layout/directives/dismisser',
	// 'layout/directives/smartMenu',
	// 'layout/directives/bigBreadcrumbs',
	// 'layout/directives/stateBreadcrumbs',
	// 'layout/directives/systemMenu',
	// 'layout/directives/smartPageTitle',
	// 'layout/directives/hrefVoid',
	'layout/directives/customSpinner',
	// 'layout/directives/datatableBasic',
	// 'layout/directives/datatableServerSide',
	// 'layout/directives/datatableColumnFilter',
	// 'layout/directives/datatableColumnReorder',
	// 'layout/directives/datatableTableTools',
	// 'layout/directives/multiGrpSelectDropDown',
 //    'layout/service/appendPropertyService',
	// 'layout/service/preflightApiService',
	'layout/service/errorNotificationsService',
	// //'layout/directives/datatablePoc',


	// 'layout/directives/widgetDataToolbar',
	// 'layout/directives/tableActions',
	// 'layout/directives/formActions',
	// 'layout/directives/assignActions',
	'layout/service/SmartCss',
	// 'layout/service/dtEncoderFactory',
	// 'layout/directives/maskForm',
	// 'layout/service/facilityRoutingService',
	// 'layout/service/systemRefreshService',
	// 'layout/service/barcodeScannerService',
	'components/frontend-session-validations/userSessionService',
	// 'modules/widgets/directives/widgetGrid',
	// 'modules/widgets/directives/jarvisWidget',
	// 'layout/directives/facilitySelectorLink',
	// 'layout/directives/barcodeScanner',
	'layout/directives/networkStatus',
	'components/language/form-validation-key-service',
	// 'layout/filters/localDateTimeFilter',
	'components/notifications/notificationFlyOut',
	// 'layout/filters/uniqueFilter',
	// 'layout/service/productionStatusService',
 //    'layout/service/fileUploadService',

	// //jQuery Accordion
	// 'layout/directives/jquiAccordion',

	// // System update notification
	// 'layout/service/notificationMessages',
	// 'layout/service/notificationService',

	// // Dashboard
	// 'dashboard/module',
	// 'dashboard/services/connectionService',
	// 'dashboard/directives/dashboardBinnedJobs',
	// 'dashboard/directives/dashboardJobsSummary',
	// 'dashboard/directives/dashboardOrdersSummary',

	// Useful Links Component - Dashboard Panel
	// 'components/useful-links/usefulLinksCtrl',
	// 'components/useful-links/models/useful-links',
	// 'components/useful-links/directives/usefulLinksList',

	// Announcements Component - Dashboard Panel
	// 'components/announcements/announcementsCtrl',
	// 'components/announcements/models/announcements',
	// 'components/announcements/directives/announcements',

	// // Dashboard Notification
	// 'components/job-notifications/jobNotifications',
	// 'components/job-notifications/notificationTypeClass',

	// Language components & controller
	'components/language/Language',
	'components/language/languageSelector',
	'components/language/language-controller',

	//'components/projects/Project',
	//'components/projects/recentProjects',

	// Activities Working feature
	'components/activities/activities-controller',
	'components/activities/activities-dropdown-toggle-directive',
	'components/activities/activities-service',

	// Alerts Working feature
	'components/alerts/alerts-controller',
	'components/alerts/alerts-dropdown-toggle-directive',
	'components/alerts/alerts-service',

	// Shortcut Directive - Large Icons above breadcrumbs
	//'components/shortcut/shortcut-directive',

	// //Local Storage
	// 'modules/local-storage/module',

	// // Graphs
	// 'modules/graphs/module',

	// // UI
	// 'modules/ui/module',

	// // Widgets
	// 'modules/widgets/module',

	// // SmartAdmin
	// 'modules/smart-admin/module',

	// // Customer
	// 'modules/customer/views/customer/module',

	// // customer setup
	// 'modules/customer/views/setup/module',

	// // estimates
	// 'modules/estimates/module',

	// // orders
	// 'modules/orders/services/initialOrderDataService',
	// 'modules/orders/module',

	// // closed orders
	// 'modules/orders/views/archived-orders/module',

	// // jobs
	// 'modules/jobs/module',

	// // production-setup
	// 'modules/production-setup/views/module',
	// 'modules/production-setup/services/operations/initialOperationsDataService',
	// 'modules/production-setup/services/operations/machineStandardDataService',
	// 'modules/production-setup/services/operations/materialStandardDataService',
	// 'modules/production-setup/services/operations/laborStandardDataService',

	// // production
	// 'modules/production/views/production/module',

	// // pre-flight
	// //'modules/preflight/module',

	// //Workflow Management
	// 'modules/workflow-management/module',
	
	// // Imposition
	// //'modules/imposition/module',
	
	// // workflow-editor
	// 'modules/production/views/workflow-editor/module',

	// // production / job-manager
	// 'modules/production/views/job-manager/module',

	// // production / resource-setup
	// 'modules/production/views/resource-setup/module',

	// // Products
	// 'modules/products/module',

	// // Inventory
	// 'modules/inventory/module',

	// // Portals
	// 'modules/portals/module',

	// // Templates
	// 'modules/templates/module',

	// // Files
	// 'modules/files/module',

	// // Reports
	// 'modules/reports/module',

	// // Site
	// 'modules/site/module',

	// // Site
 //    'modules/jobs-stats/module',

	// //GoJs Demo
	// 'modules/goDiagramDemo/module'

], function () {
	'use strict';
});
