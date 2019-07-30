sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
	"use strict";

	return Controller.extend("com.get.FelxColumnApp.controller.Detail", {
		
		_formFragments: {},
		_bEditMode: false,
		
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oModel = this.getOwnerComponent().getModel();
			
			this.oRouter.getRoute("detail").attachPatternMatched(this._onRequirementMatched, this);
			this._showFormFragment("DisplayRequirement");
		},
		
		handleFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.oRouter.navTo("detail", {layout: sNextLayout});
		},
		
		handleExitFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
			this.oRouter.navTo("detail", {layout: sNextLayout});
		},
		
		handleClose: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			this.oRouter.navTo("master", {layout: sNextLayout});
		},
		
		// Handle EDIT Requirement Button Press
		handleEditDisplayPress: function() {
			this._toggleButtonsAndView(this._bEditMode);
		},
		
		_toggleButtonsAndView: function (bEditMode) {
			
			var oView = this.getView();
			
			// Show the appropriate action buttons
			if(!bEditMode){
				oView.byId("btnFormEditDisplay").setText("Cancel");
				oView.byId("btnFormEditDisplay").setType(sap.m.ButtonType.Reject);
				oView.byId("btnFormDelete").setVisible(bEditMode);
				oView.byId("btnFormSave").setVisible(!bEditMode);
			} else {
				oView.byId("btnFormEditDisplay").setText("Edit");
				oView.byId("btnFormEditDisplay").setType(sap.m.ButtonType.Emphasized);
				oView.byId("btnFormDelete").setVisible(bEditMode);
				oView.byId("btnFormSave").setVisible(!bEditMode);
			}

			// Set the right form type
			this._showFormFragment(!bEditMode ? "EditRequirement" : "DisplayRequirement");
			
			// Remember UI State
			this._bEditMode = !this._bEditMode;
		},
		
		// When the route is reached bind context to controls in Details view
		_onRequirementMatched: function (oEvent) {
			this._requirement = oEvent.getParameter("arguments").requirement || this._requirement || "0";
			
			if(this._requirement){
				this.getView().bindElement({
					path: "/RequirementCollection/" + this._requirement,
					model: "requirements"
				});
			}
		},
		
		// Returns the instance of the form fragment
		_getFormFragment: function (sFragmentName){
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "com.get.FelxColumnApp.fragment." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},
		
		// Handle remove previous and add new fragment
		_showFormFragment: function (sFragmentName){
			var pageSubsection = this.byId("opssFormHolder");

			pageSubsection.removeAllBlocks();
			pageSubsection.addBlock(this._getFormFragment(sFragmentName));
		}
			
	});
}, true);