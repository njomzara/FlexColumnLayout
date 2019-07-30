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
			var	requirementPath = oEvent.getSource().getBindingContext("requirements").getPath(),
				requirement = requirementPath.split("/").slice(-1).pop();
		
			this.oRouter.navTo("detail", {layout: oNextUIState.layout, requirement: requirement});
		},
		
		onSearch: function (oEvent) {
			var oModelFilter = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oModelFilter = new Filter({
							    filters: [
							      new Filter({
							        path: 'ProductTxt',
							        operator: FilterOperator.Contains,
							        value1: sQuery
							      }),
							      new Filter({
							        path: 'RequirementId',
							        operator: FilterOperator.Contains,
							        value1: sQuery
							      })
							    ],
							    or: true|false
							  });
			}

			this.getView().byId("requirementsTable").getBinding("items").filter(oModelFilter);
		},

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("requirementsTable"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("RequirementId", this._bDescendingSort);

			oBinding.sort(oSorter);
		},
		
		// Return instance of New Requiremnet Dialog
		_newBusinessFunctionDialog : function(){
			// create a fragment with dialog, and pass the selected data
            if (!this.dialog) {
                // This fragment can be instantiated from a controller as follows:
                this.dialog = sap.ui.xmlfragment(
                	this.getView().getId(),
                	"com.get.FelxColumnApp.fragment.NewRequirement",
                	this);
            }
           
           return this.dialog;
		},
		
		// Add node to the TreeTable
		onNewRequirement : function(){
			this._newBusinessFunctionDialog().setModel(this.getView().getModel("requirements"), "products");
			this._newBusinessFunctionDialog().open();
		},
		
		onCreateNewRequirement: function(){
			MessageBox.confirm(
				"Create New Requirement?", {
					styleClass: "sapUiSizeCompact",
					onClose: function(oAction){
						
					}
				}
			);
		},
		
		onCancelNewRequirement: function(){
			this._newBusinessFunctionDialog().close();
		}
		
	});
}, true);