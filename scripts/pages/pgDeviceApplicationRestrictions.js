const System = require("sf-core/device/system");
const extend = require('js-base/core/extend');
const PgDeviceApplicationRestrictionsDesign = require('ui/ui_pgDeviceApplicationRestrictions');
const getStore = require("duck/store");
const waitDialog = require("lib/dialog");
const { getDomainCategoryRestrictions, createDomainCategoryRestrictions, deleteDomainCategoryRestrictions } = require("service/restrictions");
const genericErrorHandler = require("lib/genericErrorHandler");
const { getCategories, getApplications } = require("service/domainCategories");
const { setAllApplications, setAllCategories } = require("duck/actions");

const PgDeviceApplicationRestrictions = extend(PgDeviceApplicationRestrictionsDesign)(
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.initListView = initListView.bind(this);
		this.refreshListView = refreshListView.bind(this);
	}
);

function onShow(superOnShow) {
	superOnShow();
}

function refreshListView() {
	const page = this;
	let listOfAllOptions;
	let f = page.routeData.isCategoryRestrictions ? getCategories : getApplications;
	return new Promise((resolve, reject) => {
		f()
			.then((e) => {
				listOfAllOptions = e;
				return getDomainCategoryRestrictions();
			})
			.then(({ domainCategoryRestrictions }) => {
				let action = page.routeData.isCategoryRestrictions ? setAllCategories : setAllApplications;
				getStore().dispatch(action(listOfAllOptions, domainCategoryRestrictions));

				let applicationList = getStore().getState().applicationList;
				page.lvApplications.itemCount = applicationList.length;
				page.lvApplications.height = page.lvApplications.rowHeight * applicationList.length;
				page.lvApplications.refreshData();
				System.OS === "Android" ? page.svMain.layout.applyLayout() : page.layout.applyLayout();
			})
			.catch(genericErrorHandler)
			.finally(resolve);
	});
}

function onLoad(superOnLoad) {
	superOnLoad();
	const page = this;
	const state = getStore().getState();
	const deviceId = state.currentDeviceID;
	const currentDevice = state.devices.find((device) => device.id === deviceId);
	const infoText = page.routeData.isCategoryRestrictions ?
		global.lang.pgDeviceCategoryRestrictionsTitle : global.lang.pgDeviceApplicationRestrictionsTitle;
	page.headerBar.title = page.routeData.isCategoryRestrictions ?
		global.lang.pgDeviceCategoryCategory : global.lang.pgDeviceCategoryApp;
	page.lblInfo.text = infoText.replace("$1", currentDevice.name);
	page.initListView();
	page.refreshListView();
}

function initListView() {
	const page = this;
	const { lvApplications } = page;
	lvApplications.rowHeight = 80;
	lvApplications.refreshEnabled = false;
	lvApplications.scrollEnabled = false;

	lvApplications.onRowBind = (listViewItem, index) => {
		let applicationList = getStore().getState().applicationList;
		let currentItem = applicationList[index];
		let isLastItem = index === applicationList.length - 1;
		listViewItem.showSeparator = !isLastItem;
		let { name, image, isAllowed } = currentItem;
		listViewItem.image = image;
		listViewItem.appName = name;
		if (typeof isAllowed !== "undefined")
			listViewItem.status = !isAllowed;
		else
			listViewItem.status = false;
		listViewItem.onToggleChanged = function() {
			let currentItem = this;
			let f = !listViewItem.status ? createDomainCategoryRestrictions(currentItem.domainCategoryId) :
				deleteDomainCategoryRestrictions(currentItem.id);
			let dialog = waitDialog.wait();
			f
				.then(() => page.refreshListView())
				.catch(genericErrorHandler)
				.finally(() => dialog.hide());
		}.bind(currentItem);
	};
}

module.exports = PgDeviceApplicationRestrictions;
