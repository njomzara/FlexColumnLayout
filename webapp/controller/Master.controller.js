sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
	"use strict";

	return Controller.extend("com.get.FelxColumnApp.controller.Master", {
		
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this._bDescendingSort = false;
		},
		
		onListItemPress: function (oEvent) {
			// Get next UI state description to be passed as a paramter
			// It's actually layout setting for FLC to show two columns 
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1);
			
			// Get Node No from the path in the binding context
			// Path identifies exact position of the item in the model array
			var	productPath = oEvent.getSource().getBindingContext("products").getPath(),
				product = productPath.split("/").slice(-1).pop();
		
			this.oRouter.navTo("detail", {layout: oNextUIState.layout, product: product});
		},
		
		onSearch: function (oEvent) {
			var oModelFilter = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oModelFilter = [new Filter("Name", FilterOperator.Contains, sQuery)];
			}

			this.getView().byId("productsTable").getBinding("items").filter(oModelFilter);
		},

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("productsTable"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("Name", this._bDescendingSort);

			oBinding.sort(oSorter);
		}
		
	});
}, true);