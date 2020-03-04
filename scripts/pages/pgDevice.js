const AlertView = require("sf-core/ui/alertview");
const LviUser = require("components/LviUser");
const LviDeviceDetail = require("components/LviDeviceDetail");
const addChild = require("@smartface/contx/lib/smartface/action/addChild");
const extend = require('js-base/core/extend');
const PgDeviceDesign = require('ui/ui_pgDevice');
const getStore = require("duck/store");
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const genericErrorHandler = require("lib/genericErrorHandler");
const waitDialog = require("lib/dialog");
const { removeDeviceFromDslAccount, updateDevice, updateAvatarPhoto } = require("service/device");
const devicePhotoMenu = require("lib/devicePhotoMenu");
const ROW_TYPE = {
	USER: 0,
	DETAIL: 1
};
const {
	deleteDeviceFromDSLAccount,
	setInternetStatusOfDevice,
	updateDevicePhoto
} = require("duck/actions");
const { BASE_URL } = require("config");

const PgDevice = extend(PgDeviceDesign)(
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.initListView = initListView.bind(this);
		this.setStatusEvent = setStatusEvent.bind(this);
		this.changeDeviceInternetStatus = changeDeviceInternetStatus.bind(this);
		this.changeDevicePhoto = changeDevicePhoto.bind(this);
		this.showConfirmationDialog = showConfirmationDialog.bind(this);
		this.ios.onSafeAreaPaddingChange = ({ bottom }) => {
			let height = getCombinedStyle(".flInternetPlayPause").height + bottom;
			this.flInternetPlayPause.dispatch({
				type: "updateUserStyle",
				userStyle: { height }
			});
		};
		this.data = [{
			type: ROW_TYPE.USER
		}, {
			type: ROW_TYPE.DETAIL,
			imgLabel: 'apps.png',
			lblSetting: global.lang.pgDeviceCategoryApp,
			route: "/pages/deviceAppLimit"
		}, {
			type: ROW_TYPE.DETAIL,
			imgLabel: 'category.png',
			lblSetting: global.lang.pgDeviceCategoryCategory,
			route: "/pages/deviceAppLimit"
		}, {
			type: ROW_TYPE.DETAIL,
			imgLabel: 'whitelist.png',
			lblSetting: global.lang.pgDeviceCategoryWhitelist,
			route: "/pages/whiteBlackList"
		}, {
			type: ROW_TYPE.DETAIL,
			imgLabel: 'time.png',
			lblSetting: global.lang.pgDeviceCategoryTime,
			route: "/pages/deviceTimeLimit"
		}];
	}
);

function onShow(superOnShow) {
	superOnShow();
}

function onLoad(superOnLoad) {
	superOnLoad();
	const page = this;
	page.headerBar.title = global.lang.pgDeviceHeaderBarTitle;
	page.initListView();
	page.setStatusEvent();
	let listener = () => {
		const state = getStore().getState();
		const currentDeviceID = state.currentDeviceID;
		const currentDevice = state.devices.find(a => a.id === currentDeviceID);
		if (!currentDevice)
			return;
		page.flInternetPlayPause.status = currentDevice.isInternetEnabled;
		page.lvMain.refreshData();
	};

	listener();
	getStore().subscribe(listener);
}

function initListView() {
	const page = this;
	const { lvMain } = page;
	var itemIndex = 0;

	lvMain.itemCount = page.data.length;
	lvMain.refreshEnabled = false;

	lvMain.onRowCreate = (type) => {
		let item;
		switch (type) {
			case ROW_TYPE.USER:
				item = new LviUser();
				break;
			case ROW_TYPE.DETAIL:
				item = new LviDeviceDetail();
				break;
		}
		this.dispatch(addChild("item" + (++itemIndex), item));
		return item;
	};

	lvMain.onRowBind = (listViewItem, index) => {
		const { lblSetting, imgLabel, type } = page.data[index];
		switch (type) {
			case ROW_TYPE.USER:
				const devices = getStore().getState().devices;
				const currentDeviceID = getStore().getState().currentDeviceID;
				const currentDevice = devices.find(d => d.id === currentDeviceID);
				const { name, macAddress, avatar } = currentDevice || {};
				listViewItem.deviceName = name;
				listViewItem.deviceMac = macAddress;
				listViewItem.profileImage = avatar;
				listViewItem.onEditClick = () => page.router.push("/pages/editDeviceName/editDeviceName", { operation: "editDevice" });
				listViewItem.onDeleteClick = () => page.showConfirmationDialog(name);
				listViewItem.onPhotoClick = page.changeDevicePhoto();
				break;
			case ROW_TYPE.DETAIL:
				listViewItem.labelSetting = lblSetting;
				listViewItem.icon = imgLabel;
				break;
		}
	};

	lvMain.onRowHeight = (index) => {
		let { type } = page.data[index];
		switch (type) {
			case ROW_TYPE.USER:
				return 180;
			case ROW_TYPE.DETAIL:
				return 80;
		}
	};

	lvMain.onRowSelected = (item, index) => {
		let { route } = page.data[index];
		let isCategoryRestrictions = page.data[index].lblSetting === global.lang.pgDeviceCategoryCategory;
		let isApplicationRestricions = page.data[index].lblSetting === global.lang.pgDeviceCategoryApp;
		route && page.router.push(route, {
			isCategoryRestrictions,
			isApplicationRestricions
		});
	};

	lvMain.onRowType = index => page.data[index].type;
}

function showConfirmationDialog(deviceName) {
	const page = this;
	alert({
		title: global.lang.confirm,
		message: global.lang.deleteDeviceConfirmationMessage,
		buttons: [{
			text: global.lang.yes,
			type: AlertView.Android.ButtonType.POSITIVE,
			onClick: () => {
				let dialog = waitDialog.wait();
				let { currentDeviceID } = getStore().getState();
				removeDeviceFromDslAccount()
					.then(e => {
						getStore().dispatch(deleteDeviceFromDSLAccount(currentDeviceID));
					})
					.catch(genericErrorHandler)
					.finally(() => {
						dialog.hide();
						page.router.canGoBack() && page.router.goBack();
					});
			}
		}, {
			text: global.lang.no,
			type: AlertView.Android.ButtonType.NEGATIVE,
			onClick: () => page.router.dismiss()
		}]
	});
}

function setStatusEvent() {
	const page = this;
	const state = getStore().getState();
	const deviceId = state.currentDeviceID;
	let currentDevice = state.devices.find(o => o.id === deviceId);
	page.flInternetPlayPause.status = currentDevice.isInternetEnabled;
	page.flInternetPlayPause.onClick = () => changeDeviceInternetStatus(currentDevice);
}

function changeDeviceInternetStatus(currentDevice) {
	let dialog = waitDialog.wait();
	let oldInternetStatus = currentDevice.isInternetEnabled;
	let newInternetStatus = !oldInternetStatus;
	let options = {
		key: "isInternetEnabled",
		value: newInternetStatus
	};
	updateDevice(options)
		.then(() => {
			getStore().dispatch(setInternetStatusOfDevice(newInternetStatus));
		})
		.catch(e => {
			genericErrorHandler(e);
			this.status = oldInternetStatus;
		})
		.finally(() => dialog.hide());
}

function changeDevicePhoto() {
	const page = this;
	return devicePhotoMenu.bind(page, function(_image) {
		let image = _image.resize(200, 200);
		page.profileImage = image.toBlob().toBase64();
		let dialog = waitDialog.wait();
		let profileImage = page.profileImage;
		updateAvatarPhoto(profileImage)
			.then(({ avatar }) => {
				getStore().dispatch(updateDevicePhoto(avatar));
			})
			.catch(genericErrorHandler)
			.finally(() => dialog.hide());
	});
}

module.exports = PgDevice;
