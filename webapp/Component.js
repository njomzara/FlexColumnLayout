sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/get/FelxColumnApp/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/f/FlexibleColumnLayoutSemanticHelper"
], function(UIComponent, Device, models, JSONModel, FlexibleColumnLayoutSemanticHelper) {
	"use strict";

	return UIComponent.extend("com.get.FelxColumnApp.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			// Generic model
			var oModel = new JSONModel();
			this.setModel(oModel);
			
			// set products demo model on this sample
			var oProductsModel = new JSONModel("localService/mockdata/products.json");
			oProductsModel.setSizeLimit(1000);
			this.setModel(oProductsModel, "products");
			
			// Initialize Router
			this.getRouter().initialize();
		
		},
		
		// Get helper instance for FlexibleColumnLayout
		getHelper: function () {
			
			// Get FlexibleColumnLayout Control from the rootView
			var oFCL = this.getRootControl().byId("fcl");
			//var oParams = jQuery.sap.getUriParameters();
			
			var oSettings = {
				defaultTwoColumnLayoutType: sap.f.LayoutType.TwoColumnsMidExpanded
				//mode: oParams.get("mode"),
				//initialColumnsCount: oParams.get("initial"),
			    //maxColumnsCount: oParams.get("max")
			};

			return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
			
		}
		
	});
});