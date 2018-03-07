/**
 * Created by Dante Garcia on 10/2/2015.
 * Path: public/app/layout/service/facilityRoutingService.js
 */
define(['layout/module'], function (module) {

	'use strict';

	return module.registerService('facilityRouteService', function ($rootScope) {
		var FacilityRoute = {
			//Orders
			ordersViewScreenState : undefined,
			ordersViewScreenUrl : undefined,
			ordersGridScreenState : undefined,
			ordersGridScreenUrl : undefined,

			//Archived (Closed) Orders
			closedOrdersViewScreenState : undefined,
			closedOrdersViewScreenUrl : undefined,
			closedOrdersGridState : undefined,
			closedOrdersGridUrl : undefined,

			//Jobs
			jobsViewScreenState          : undefined,
			jobsViewScreenURL       : undefined,
			jobsGridScreenState          : undefined,
			jobsGridScreenURL       : undefined,
			routePendingScreenState      : undefined,
			routePendingScreenURL   : undefined,
            jobBatchScreenState      : undefined,
            jobBatchScreenURL        : undefined
		};
		var curFacilityType = 0;


		return {
			setRoutingParameters : function (facilityType){
				switch (parseInt(facilityType)){
					case 1 :
						FacilityRoute ={
							ordersViewScreenState : 'app.orders.orders-view',
							ordersViewScreenUrl : '/orders/details/',
							ordersGridScreenState : 'app.orders.list',
							ordersGridScreenUrl : '/orders',
							
							closedOrdersViewScreenState : 'app.closed-orders.list',
							closedOrdersViewScreenUrl : '/closed-orders',
							closedOrdersGridState : 'app.closed-orders.view',
							closedOrdersGridUrl : '/details/',

							jobsViewScreenState      : 'app.jobs.jobs-details',
							jobsViewScreenURL        : '/jobs/details/',
							jobsGridScreenState      : 'app.jobs.list',
							jobsGridScreenURL        : '/jobs',
                            jobBatchScreenState      : 'app.jobs.job-batching',
                            jobBatchScreenURL        : '/jobs/job-batching',
							routePendingScreenState  : 'app.jobs.route-pending',
							routePendingScreenURL    : '/jobs/route-pending'
						};
						curFacilityType = facilityType;
						break;
					case 2 :
						FacilityRoute ={
							ordersViewScreenState : 'app.orders.orders-view',
							ordersViewScreenUrl : '/orders/details/',
							ordersGridScreenState : 'app.orders.list',
							ordersGridScreenUrl : '/orders',

							closedOrdersViewScreenState : 'app.closed-orders.list',
							closedOrdersViewScreenUrl : '/closed-orders',
							closedOrdersGridState : 'app.closed-orders.view',
							closedOrdersGridUrl : '/details/',

							jobsViewScreenState     : 'app.jobs.jobs-details',
							jobsViewScreenURL       : '/jobs/details/',
							jobsGridScreenState     : 'app.jobs.hub',
							jobsGridScreenURL       : '/hub',
                            jobBatchScreenState      : 'app.jobs.job-batching',
                            jobBatchScreenURL        : '/jobs/job-batching',
							routePendingScreenState : 'app.jobs.route-pending',
							routePendingScreenURL   : '/jobs/route-pending'
						};
						curFacilityType = facilityType;
						break;
					default :
						FacilityRoute ={
							ordersViewScreenState : 'app.orders.orders-view',
							ordersViewScreenUrl : '/orders/details/',
							ordersGridScreenState : 'app.orders.list',
							ordersGridScreenUrl : '/orders',

							closedOrdersViewScreenState : 'app.closed-orders.list',
							closedOrdersViewScreenUrl : '/closed-orders',
							closedOrdersGridState : 'app.closed-orders.view',
							closedOrdersGridUrl : '/details/',

							jobsViewScreenState     : 'app.jobs.jobs-details',
							jobsViewScreenURL       : '/jobs/details/',
							jobsGridScreenState     : 'app.jobs.list',
							jobsGridScreenURL       : '/jobs',
                            jobBatchScreenState      : 'app.jobs.job-batching',
                            jobBatchScreenURL        : '/jobs/job-batching',
							routePendingScreenState : 'app.jobs.route-pending',
							routePendingScreenURL   : '/jobs/route-pending'
						};
						curFacilityType = 0;
				}
			},
			getJobViewScreen : function(){
				return FacilityRoute.jobsViewScreenState;
			},
			getJobGridScreen : function() {
				return FacilityRoute.jobsGridScreenState;
			},
			getJobGridScreenByURL: function (){
				return FacilityRoute.jobsGridScreenURL;
			},
			routePendingScreen : function() {
				return FacilityRoute.routePendingScreenState;
			},
            jobBatchingScreenScreen : function() {
                return FacilityRoute.jobBatchScreenState;
            },
			getCurrentFacilityType : function(){
				return curFacilityType;
			},
			getOrdersViewScreen : function(){
				return FacilityRoute.ordersViewScreenState;
			},
			getClosedOrdersViewScreen : function(){
				return FacilityRoute.closedOrdersGridState;
			}

		};
	});
});