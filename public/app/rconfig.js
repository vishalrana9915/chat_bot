var require = {

	waitSeconds: 0,
	paths: {

		'jquery': '../dist/plugins/jquery/dist/jquery.min',

		'jquery-ui': '../dist/plugins/jquery-ui/jquery-ui.min',

		'bootstrap': '../dist/plugins/bootstrap/bootstrap/dist/3.3.6/bootstrap.min',

		'angular'           : '../dist/plugins/angular/1.4.2/angular',

		'angular-cookies'   : '../dist/plugins/angular/1.4.2/angular-cookies',

		'ngStorage': '../dist/plugins/ngStorage/ngStorage',

		'domReady': '../dist/plugins/requirejs-domready/domReady',
		'angular-resource'  : '../dist/plugins/angular/1.4.2/angular-resource.min',
		'angular-sanitize'  : '../dist/plugins/angular/1.4.2/angular-sanitize.min',
		'angular-animate'   : '../dist/plugins/angular/1.4.2/angular-animate.min',

		'angular-ui-router': '../dist/plugins/angular-ui-router/release/angular-ui-router.min',
		//'angular-ui-router': '../plugin/angular-ui-router/v0.2.18/angular-ui-router',
		'angular-filter':'../dist/plugins/angular-filter/angular-filter',
		
		'ui-bootstrap': '../dist/plugins/ui-bootstrap/ui-bootstrap-tpls-1.1.2',

		'angular-couch-potato': '../dist/plugins/angular-couch-potato/dist/angular-couch-potato',

		'angular-ui-select': '../dist/plugins/angular-ui-select/dist/select.min',

		'jquery-color': '../dist/plugins/jquery-color/jquery.color',

		'spinner-js': '../dist/plugins/spinjs/spin.min',

		'jquery-form': '../dist/plugins/jquery-form/jquery.form',

		'bootstrap-validator': '../dist/plugins/bootstrapvalidator/dist/js/bootstrapValidator.min',


    	'Chart':"../vendors/Chart.js/dist/chart.min",

    	'progressbar':"../vendors/bootstrap-progressbar/bootstrap-progressbar.min",

    	'date':"../vendors/DateJS/build/date",

    	'daterangepicker':"../vendors/bootstrap-daterangepicker/daterangepicker",
		// This is a custom build of form-validator that does NOT consist of all validators.
		// Only popular validators are included
		// SSM : TODO: Replace with minified version after debugging
		'form-validator' : '../dist/plugins/formvalidation/dist/js/formValidation.popular',
		'form-validator': '../dist/plugins/formvalidation/dist/js/formValidation',
		// 'smartwidgets': '../smartadmin-plugin/smartwidgets/jarvis.widget.min',
		// 'notification': '../smartadmin-plugin/notification/SmartNotification.min',

		// Don't confuse bootstrap(.min).js file provided by the Bootstrap framework with bootstrap(.min).js provided by
		// FormValidation which is placed inside the formvalidation/dist/js/framework directory.
		'form-validator-bootstrap': '../dist/plugins/formvalidation/dist/js/framework/bootstrap.min',
		'form-validator-mandatoryicon': '../dist/plugins//formvalidation-mandatoryIcon/dist/mandatoryIcon.min',
		'form-validator-i18n': '../dist/plugins//formvalidation-i18n/src/i18n',

		//form validator language packages
		'form-validator-en_CA': '../dist/plugins/formvalidation/dist/js/language/en_CA',
		'form-validator-en_US': '../dist/plugins/formvalidation/dist/js/language/en_US',
		'form-validator-fr_CA': '../dist/plugins/formvalidation/dist/js/language/fr_CA',

		'lodash': '../dist/plugins/lodash/dist/lodash.min',
		// app js file includes
		'appConfig': '../app.config',
		'modules-includes': 'includes',
		'custom':'../dist/js/custom.min',
		'io': '../dist/plugins/socket.io-client/dist/socket.io',
		'toastr': '../dist/plugins/angular-toastr/dist/angular-toastr.tpls',
		'skycons': "../vendors/skycons/skycons",
		'flot' : "../vendors/Flot/jquery.flot",
		'pie':"../vendors/Flot/jquery.flot.pie",
		'time':'../vendors/Flot/jquery.flot.time',
		'stack':'../vendors/Flot/jquery.flot.stack',
		'resize':'../vendors/Flot/jquery.flot.resize',
		'orderBars':"../vendors/flot.orderbars/js/jquery.flot.orderBars",
		'spline':"../vendors/flot-spline/js/jquery.flot.spline.min",
		'curvedLines':"../vendors/flot.curvedlines/curvedLines",
		'moment'	: '../dist/plugins/moment/min/moment.min',
		'date'		: '../vendors/DateJS/build/date',
		'datepicker': '../vendors/bootstrap-daterangepicker/daterangepicker'
    // <script src="../vendors/DateJS/build/date.js"></script>
    // <!-- JQVMap -->
    // <script src="../vendors/jqvmap/dist/jquery.vmap.js"></script>
    // <script src="../vendors/jqvmap/dist/maps/jquery.vmap.world.js"></script>
    // <script src="../vendors/jqvmap/examples/js/jquery.vmap.sampledata.js"></script>
    // <!-- bootstrap-daterangepicker -->
    // <script src="../vendors/moment/min/moment.min.js"></script>
    // <script src="../vendors/bootstrap-daterangepicker/daterangepicker.js"></script>
		// '720Kb':'../dist/plugins/angularjs-datepicker/src/js/angular-datepicker'
		},
	shim: {
		'angular': {'exports': 'angular', deps: ['jquery']},
		'angular-animate': {deps: ['angular']},
		'angular-resource': {deps: ['angular']},
		'angular-cookies': {deps: ['angular']},
		'custom':{deps:['angular','jquery',]},
		'nprogress':{deps:['angular','jquery']},
		'Chart':{deps:['angular','jquery']},
		'progressbar':{deps:['angular','jquery']},
		'daterangepicker':{deps:['angular','jquery']},
		//'angular-bootstrap' : {deps : ['angular']},
		'ui-bootstrap': {deps: ['angular', 'angular-animate']},
		'angular-ui-router': {deps: ['angular']},
		'angular-filter':{deps: ['angular']},
		'angular-couch-potato': {deps: ['angular']},
		'toastr': {deps: ['angular','jquery'],exports:'toastr'},
		'anim-in-out': {deps: ['angular-animate']},
		'angular-easyfb': {deps: ['angular']},
		'angular-google-plus': {deps: ['angular']},
		'select2': {deps: ['jquery']},
		'spinner-js': {deps: ['jquery']},
		'summernote': {deps: ['jquery']},
		'to-markdown': {deps: ['he']},
		'bootstrap-markdown': {deps: ['jquery', 'markdown', 'to-markdown']},
		'moment': {exports: 'moment'},
		'moment-timezone': {deps: ['moment']},
		'moment-timezone-data': {deps: ['moment']},
		'moment-helper': {deps: ['moment-timezone-data']},
		'bootstrap-daterangepicker': {deps: ['jquery', 'moment']},
		'jquery-maskedinput': {deps: ['jquery']},
		'jquery-validation': {deps: ['jquery']},
		'jquery-form': {deps: ['jquery']},
		'jquery-color': {deps: ['jquery']},
		'jcrop': {deps: ['jquery-color']},
		'bootstrap-validator': {deps: ['jquery']},
		'intl-tel-input-master': {deps: ['jquery']},
		'form-validator': {deps: ['jquery']},
		'form-validator-i18n': {deps: ['form-validator']},
		'form-validator-mandatoryicon': {deps: ['form-validator']},
		'form-validator-bootstrap': {deps: ['form-validator']},
		'form-validator-en_CA': {deps: ['form-validator']},
		'form-validator-fr_CA': {deps: ['form-validator']},
		'bootstrap-timepicker': {deps: ['jquery']},
		'clockpicker': {deps: ['jquery']},
		'nouislider': {deps: ['jquery']},
		'ionslider': {deps: ['jquery']},
		'bootstrap-duallistbox': {deps: ['jquery']},
		'bootstrap-colorpicker': {deps: ['jquery']},
		'fuelux-wizard': {deps: ['jquery']},
		'bootstrap': {deps: ['jquery']},
		'magnific-popup': {deps: ['jquery']},
		'modules-includes': {deps: ['angular']},
		'sparkline': {deps: ['jquery']},
		'easy-pie': {deps: ['jquery']},
		//SSM Removed
		'jquery-jvectormap': {deps: ['jquery']},
		'jquery-jvectormap-world-mill-en': {deps: ['jquery']},
		'dropzone': {deps: ['jquery']},
		'bootstrap-progressbar': {deps: ['bootstrap']},
		'jquery-ui': {deps: ['jquery']},
		'jquery-nestable': {deps: ['jquery']},
		'superbox': {deps: ['jquery']},
		'notification': {deps: ['jquery']},
		// 'smartwidgets': {deps: ['jquery-ui']},
		'ngStorage': {exports: 'ngStorage', deps: ['angular']}
	},
	priority: [
		'jquery',
		'bootstrap',
		'angular'
	]
};
