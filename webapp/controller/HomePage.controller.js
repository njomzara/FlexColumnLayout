sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.get.FelxColumnApp.controller.HomePage", {

		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRouteMatched(this.onRouteMatched, this);
			this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		},

		onBeforeRouteMatched: function(oEvent) {
			// 1. Get Generic Model 
			var oModel = this.getOwnerComponent().getModel();
			
			// Get Leyout Parameter that was routed
			var sLayout = oEvent.getParameters().arguments.layout;
			
			// If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
			// and set sLayout
			if (!sLayout) {
				var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(0);
				sLayout = oNextUIState.layout;
			}

			// Update the layout property of the FlexibleColumnLayout
			// in the Generic model
			if (sLayout) {
				oModel.setProperty("/layout", sLayout);
			}
		},

		onRouteMatched: function (oEvent) {
			// Update current UI state in the Generic Model
			// Layout property is updated within the object
			this._updateUIElements();
		},

		// Update current UI state in the Generic Model
		_updateUIElements: function () {
			var oModel = this.getOwnerComponent().getModel();
			var oUIState = this.getOwnerComponent().getHelper().getCurrentUIState();
			oModel.setData(oUIState);
		},

		onExit: function () {
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
			this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		}
		
	});
	
}, true);