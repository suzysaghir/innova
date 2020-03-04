const Application = require("sf-core/application");
const AlertView = require("sf-core/ui/alertview");
const Image = require("sf-core/ui/image");
const HeaderBarItem = require("sf-core/ui/headerbaritem");
const extend = require('js-base/core/extend');
const PgAccountDesign = require('ui/ui_pgAccount');
const getStore = require("duck/store");
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const waitDialog = require("lib/dialog");
const genericErrorHandler = require("lib/genericErrorHandler");
const { updateDslAccount } = require("service/dslAccounts");
const { setEdnsStatusOfAccount, setInternetStatusOfAccount, setCurrentDeviceId } = require("duck/actions");

const PgAccount = extend(PgAccountDesign)(
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.initListView = initListView.bind(this);
		this.refreshListView = refreshListView.bind(this);
		this.changeAccountInternetStatus = changeAccountInternetStatus.bind(this);
		this.setSwitchEvent = setSwitchEvent.bind(this);
		this.setStatusEvent = setStatusEvent.bind(this);
		this.lblTitle.text = global.lang.pgAccountProtection;
		this.ios.onSafeAreaPaddingChange = ({ bottom }) => {
			let height = getCombinedStyle(".flInternetPlayPause").height + bottom;
			this.flInternetPlayPause.dispatch({
				type: "updateUserStyle",
				userStyle: { height }
			});
		};
	}
);

function onShow(superOnShow) {
	superOnShow();
	Application.statusBar.android.color = getCombinedStyle(".sf-statusBar").android.color;
}

function onLoad(superOnLoad) {
	superOnLoad();
	const page = this;
	const editNameItem = new HeaderBarItem({
		image: Image.createFromFile("images://icon_pencil.png"),
		onPress: () => {
			page.router.push("/pages/editAccountName/editAccountName", { operation: "editAccount" });
		}
	});
	page.headerBar.setItems([editNameItem]);
	page.initListView();
	page.setSwitchEvent();
	page.setStatusEvent();

	let listener = () => {
		const state = getStore().getState();
		const currentAccountID = state.currentAccountID;
		const currentAccount = state.accounts.find(a => a.id === currentAccountID);
		page.headerBar.title = currentAccount.userDefinedName;
		page.lblInfo.text = global.lang.pgAccountTitle.replace("$1", currentAccount.userDefinedName);
		page.switchProtectionEnabled.toggle = currentAccount.isEdnsEnabled;
		page.flInternetPlayPause.status = currentAccount.isInternetEnabled;
		page.refreshListView();
	};
	listener();
	getStore().subscribe(listener);

}

function initListView() {
	const page = this;
	page.lvMain.scrollEnabled = false;
	page.lvMain.refreshEnabled = false;
	page.lvMain.onRowSelected = (item, index) => {
		const devices = getStore().getState().devices;
		let currentDeviceId = devices[index].id;
		getStore().dispatch(setCurrentDeviceId(currentDeviceId));
		page.router.push("/pages/device");
	};
	page.lvMain.onRowBind = (item, index) => {
		const devices = getStore().getState().devices;
		const { name, avatar } = devices[index];
		const isLastDevice = devices.length - 1 === index;
		item.name = name;
		item.imageURL = avatar;
		item.showSeparator = !isLastDevice;
	};
}

function refreshListView() {
	const page = this;
	page.lvMain.itemCount = getStore().getState().devices.length;
	page.lvMain.height = 75 * page.lvMain.itemCount;
	page.layout.applyLayout();
	page.lvMain.refreshData();
}

function setSwitchEvent() {
	const page = this;
	const state = getStore().getState();
	const currentAccountID = state.currentAccountID;
	const currentAccount = state.accounts.find(a => a.id === currentAccountID);

	page.switchProtectionEnabled.onToggleChanged = (switchStatus) => {
		let dialog = waitDialog.wait();
		let options = {
			key: "isEdnsEnabled",
			value: switchStatus
		};
		updateDslAccount(options)
			.then(() => {
				getStore().dispatch(setEdnsStatusOfAccount(switchStatus));
			})
			.catch(e => {
				genericErrorHandler(e);
				page.switchProtectionEnabled = currentAccount.isEdnsEnabled;
			})
			.finally(() =>
				// XXX: Workaround for Android switch crash
				setTimeout(() => dialog.hide(), 500));

	};
}

function setStatusEvent() {
	const page = this;
	const state = getStore().getState();
	const currentAccountID = state.currentAccountID;
	const currentAccount = state.accounts.find(a => a.id === currentAccountID);
	page.flInternetPlayPause.status = currentAccount.isInternetEnabled;
	page.flInternetPlayPause.onClick = () => changeAccountInternetStatus(currentAccount);
}

function changeAccountInternetStatus(currentAccount) {
	let dialog = waitDialog.wait();
	let oldInternetStatus = currentAccount.isInternetEnabled;
	let newInternetStatus = !oldInternetStatus;
	let options = {
		key: "isInternetEnabled",
		value: newInternetStatus
	};
	updateDslAccount(options)
		.then(() => {
			getStore().dispatch(setInternetStatusOfAccount(newInternetStatus));
		})
		.catch(e => {
			genericErrorHandler(e);
			this.status = oldInternetStatus;
		})
		.finally(() => dialog.hide());
}

module.exports = PgAccount;
