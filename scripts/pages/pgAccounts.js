const Application = require("sf-core/application");
const extend = require('js-base/core/extend');
const PgAccountsDesign = require('ui/ui_pgAccounts');
const { getUserInfo } = require("service/customers");
const genericErrorHandler = require("lib/genericErrorHandler");
const getStore = require("duck/store");
const {
	setUserInfo,
	setCurrentDslAccount,
	setAllDslAccounts,
	setAllDevices
} = require("duck/actions");
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const createInfoMenu = require("lib/infoMenu");
const { getDslAccounts } = require("service/dslAccounts");
const waitDialog = require("lib/dialog");
const { getDevicesFromDslAccount } = require("service/device");

const PgAccounts = extend(PgAccountsDesign)(
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.initListView = initListView.bind(this);
		this.refreshListView = refreshListView.bind(this);
		this.lblChoose.text = global.lang.pgAccountsChooseDsl;

		// Info icon stuff
		this.ios.onSafeAreaPaddingChange = ({ top }) => {
			this.flInfoWrapper.top = getCombinedStyle(".imageView-infoicon").top + top;
		};
		this.flInfoWrapper.onTouch = () => createInfoMenu(this);
	}
);

function onShow(superOnShow) {
	superOnShow();
	const page = this;
	Application.statusBar.android.color = getCombinedStyle(".statusBarAccounts").android.color;
	page.lvMain.refreshData(); // TODO: ?
}

function onLoad(superOnLoad) {
	superOnLoad();
	const page = this;
	page.initListView();
	page.refreshListView();
}

function initListView() {
	const page = this;
	page.lvMain.onRowBind = (item, index) => {
		let account = getStore().getState().accounts[index];
		item.title = account.userDefinedName;
		item.description = account.dslNo;
	};
	page.lvMain.onRowSelected = (item, index) => {
		let account = getStore().getState().accounts[index];
		let { id } = account;
		let dialog = waitDialog.wait();
		getDevicesFromDslAccount(id)
			.then(e => {
				getStore().dispatch(setCurrentDslAccount(id));
				getStore().dispatch(setAllDevices(e.devices));
				page.router.push("/pages/account");
			})
			.catch(genericErrorHandler)
			.finally(() => dialog.hide());
	};
	page.lvMain.onPullRefresh = () => page.refreshListView();
	page.lvMain.refreshEnabled = true;
}

function refreshListView() {
	const page = this;
	getUserInfo()
		.then(e => {
			getStore().dispatch(setUserInfo(e));
			return getDslAccounts();
		})
		.then(e => {
			getStore().dispatch(setAllDslAccounts(e.dslAccounts));
			page.lvMain.itemCount = getStore().getState().accounts.length;
			page.lvMain.refreshData();
		})
		.catch(genericErrorHandler)
		.finally(() => page.lvMain.stopRefresh());
}

module.exports = PgAccounts;
