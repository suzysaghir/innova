const AlertView = require("sf-core/ui/alertview");
const extend = require('js-base/core/extend');
const PgAccountEditDesign = require('ui/ui_pgAccountEdit');
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const { updateDslAccount } = require("service/dslAccounts");
const { updateDevice } = require("service/device");
const getStore = require("duck/store");
const waitDialog = require("lib/dialog");
const genericErrorHandler = require("lib/genericErrorHandler");
const {
	setCurrentDslAccountName,
	updateDeviceName
} = require("duck/actions");

const PgAccountEdit = extend(PgAccountEditDesign)(
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.btnSave.text = global.lang.pgAccountEditSave;
		this.showSuccessAlert = showSuccessAlert.bind(this);
		this.fillPage = fillPage.bind(this);
		this.ios.onSafeAreaPaddingChange = ({ bottom }) => {
			let currentBottom = getCombinedStyle("#pgFeedback-btn").bottom;
			let newBottom = bottom + currentBottom;
			this.btnSave.dispatch({
				type: "updateUserStyle",
				userStyle: { bottom: newBottom }
			});
		};
	}
);

function onShow(superOnShow) {
	superOnShow();
}

function onLoad(superOnLoad) {
	superOnLoad();
	const page = this;
	page.fillPage(page.routeData);
}

function fillPage(routeData) {
	const page = this;
	const { operation } = routeData;
	const state = getStore().getState();
	switch (operation) {
		case "editDevice":
			page.headerBar.title = global.lang.pgDeviceEditHeader;
			page.mtbName.options = {
				hint: global.lang.pgDeviceEditDeviceName,
				onTextChanged: (e) => {
					page.mtbName.materialTextBox.errorMessage =
						page.mtbName.materialTextBox.text.length === 0 ? global.lang.pgAccountEditDeviceNameError : "";
				}
			};
			page.mtbName.materialTextBox.text = state.devices.find(o => o.id === state.currentDeviceID).name;
			this.btnSave.onPress = saveDeviceName.bind(this);
			break;
		case "editAccount":
			page.headerBar.title = global.lang.pgAccountEditHeader;
			page.mtbName.options = {
				hint: global.lang.pgAccountEditAccountName,
				onTextChanged: (e) => {
					page.mtbName.materialTextBox.errorMessage =
						page.mtbName.materialTextBox.text.length === 0 ? global.lang.pgAccountEditAccountNameError : "";
				}
			};
			page.mtbName.materialTextBox.text = state.accounts.find(a => a.id === state.currentAccountID).userDefinedName;
			this.btnSave.onPress = saveAccountName.bind(this);
			break;
	}
	page.mtbName.materialTextBox.dispatch({
		type: "pushClassNames",
		classNames: [".materialTextBox.feedback"]
	});
}

function saveAccountName() {
	const page = this;
	let newName = page.mtbName.materialTextBox.text;

	if (newName.length === 0) {
		page.mtbName.materialTextBox.errorMessage = global.lang.pgAccountEditDeviceNameError;
		return;
	}
	else {
		page.mtbName.materialTextBox.errorMessage = "";
	}

	let dialog = waitDialog.wait();
	let options = {
		key: "userDefinedName",
		value: newName
	};
	updateDslAccount(options)
		.then(() => {
			getStore().dispatch(setCurrentDslAccountName(newName));
			page.showSuccessAlert(global.lang.pgAccountEditSuccessMessage);
		})
		.catch(genericErrorHandler)
		.finally(() => dialog.hide());
}

function saveDeviceName() {
	const page = this;
	let newName = page.mtbName.materialTextBox.text;
	if (newName.length === 0) {
		page.mtbName.materialTextBox.errorMessage = global.lang.pgAccountEditDeviceNameError;
		return;
	}
	else {
		page.mtbName.materialTextBox.errorMessage = "";
	}
	let dialog = waitDialog.wait();
	updateDevice({
			key: "name",
			value: newName
		})
		.then(() => {
			getStore().dispatch(updateDeviceName(newName));
			page.showSuccessAlert(global.lang.pgDeviceEditSuccessMessage);
		})
		.catch(genericErrorHandler)
		.finally(() => dialog.hide());
}

function showSuccessAlert(successMessage) {
	const page = this;
	alert({
		title: "",
		message: successMessage,
		buttons: [{
			type: AlertView.Android.ButtonType.POSITIVE,
			text: global.lang.ok,
			onClick: () => page.router.dismiss()
		}]
	});
}

module.exports = PgAccountEdit;
