const System = require("sf-core/device/system");
const ActionKeyType = require("sf-core/ui/actionkeytype");
const extend = require('js-base/core/extend');
const PgWhiteBlackListDesign = require('ui/ui_pgWhiteBlackList');
const LviApplication = require("components/LviApplication");
const { getDomainRestrictions, createDomainRestrictions, deleteDomainRestrictions, updateDomainRestrictions } = require("service/restrictions");
const waitDialog = require("lib/dialog");
const getStore = require("duck/store");
const {
	setDeviceDomainRestrictions
} = require("duck/actions");
const genericErrorHandler = require("lib/genericErrorHandler");

const PgWhiteBlackList = extend(PgWhiteBlackListDesign)(
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.onHide = onHide.bind(this, this.onHide && this.onHide.bind(this));

		this.initListView = initListView.bind(this);
		this.refreshListView = refreshListView.bind(this);
		this.addWhiteBlackList = addWhiteBlackList.bind(this);
		this.getWhiteBlackList = getWhiteBlackList.bind(this);
		this.initMaterialTextBox = initMaterialTextBox.bind(this);
		this.restrictedDomains = [];
	}
);

function onShow(superOnShow) {
	superOnShow();
	const page = this;
	const listener = () => {
		const state = getStore().getState();
		const deviceId = state.currentDeviceID;
		const currentDevice = state.devices.find((device) => device.id === deviceId);
		page.restrictedDomains = currentDevice.domainRestrictions || [];
	};
	page.unsubscribe = getStore().subscribe(listener);
	page.getWhiteBlackList();
}

function onLoad(superOnLoad) {
	superOnLoad();
	const page = this;
	const { headerBar } = page;
	headerBar.title = global.lang.pgWhiteBlackListTitle;
	page.initListView();
	page.initMaterialTextBox();
}

function onHide(superOnHide) {
	superOnHide && superOnHide();
	const page = this;
	page.unsubscribe();
}

function initListView() {
	const page = this;
	const { lvWebsites } = page;
	lvWebsites.refreshEnabled = false;
	lvWebsites.scrollBarEnabled = false;
	lvWebsites.scrollEnabled = false;
	lvWebsites.rowHeight = LviApplication.getHeight();
	lvWebsites.onPullRefresh = () => {
		page.getWhiteBlackList()
			.finally(() => lvWebsites.stopRefresh());
	};
	lvWebsites.onRowBind = (listViewItem, index) => {
		const domainRestrictionId = page.restrictedDomains[index].id;
		const domainName = page.restrictedDomains[index].domainName;
		const isAllowed = !!page.restrictedDomains[index].isAllowed;
		listViewItem.smallIcon = "icon_trash.png";
		listViewItem.appName = domainName;
		listViewItem.status = isAllowed;
		listViewItem.toggleSeparator(index !== page.restrictedDomains.length - 1);
		listViewItem.onImageClick = () => {
			deleteDomainRestrictions(domainRestrictionId)
				.finally(() => page.getWhiteBlackList());
		};
		listViewItem.onToggleChanged = () => {
			updateDomainRestrictions({ domainRestrictionId, domainName, isAllowed: !isAllowed })
				.finally(() => page.getWhiteBlackList());
		};
	};
}

function refreshListView() {
	const page = this;
	const { lvWebsites, svMain } = page;
	lvWebsites.itemCount = page.restrictedDomains.length;
	lvWebsites.refreshData();
	lvWebsites.dispatch({
		type: "updateUserStyle",
		userStyle: {
			height: lvWebsites.rowHeight * page.restrictedDomains.length
		}
	});
	System.OS === "Android" ? svMain.layout.applyLayout() : page.layout.applyLayout();
}

function initMaterialTextBox() {
	const page = this;
	const { mtbWebsite } = page;
	mtbWebsite.options = {
		hint: global.lang.addWebsite,
		actionKeyType: ActionKeyType.SEND,
		onActionButtonPress: () => mtbWebsite.materialTextBox.text && page.addWhiteBlackList(false),
		onTextChanged: (e) => {
			mtbWebsite.materialTextBox.errorMessage = (mtbWebsite.materialTextBox.text.length === 0) ? global.lang.pgWhiteBlackListWebError : "";
		}
	};
	mtbWebsite.materialTextBox.dispatch({
		type: "pushClassNames",
		classNames: [".materialTextBox.feedback"]
	});
}

function getWhiteBlackList() {
	const page = this;
	// const dialog = waitDialog.wait();
	getDomainRestrictions()
		.then((domains) => getStore().dispatch(setDeviceDomainRestrictions(domains.domainRestrictions)))
		.finally(() => {
			page.refreshListView();
			// dialog.hide();
		});
}

function addWhiteBlackList(isAllowed) {
	const page = this;
	const dialog = waitDialog.wait();
	const { mtbWebsite } = page;
	if (mtbWebsite.materialTextBox.text.length === 0) {
		mtbWebsite.materialTextBox.errorMessage = global.lang.pgWhiteBlackListWebError;
		return;
	}
	else {
		mtbWebsite.materialTextBox.errorMessage = "";
	}
	createDomainRestrictions({ domainName: mtbWebsite.materialTextBox.text, isAllowed })
		.then(() => {
			page.getWhiteBlackList();
			mtbWebsite.materialTextBox.text = "";
		})
		.catch(genericErrorHandler)
		.finally(() => dialog.hide());
}

module.exports = PgWhiteBlackList;
