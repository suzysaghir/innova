const extend = require('js-base/core/extend');
const PgTimeLimitConfigurationDesign = require('ui/ui_pgTimeLimitConfiguration');
const LviTimeLimit = require("components/LviTimeLimit");
const {
	getDailyAndHourlyRestrictions,
	updateDailyAndHourlyRestrictions,
	createDailyAndHourlyRestrictions
} = require("service/restrictions");
const waitDialog = require("lib/dialog");
const genericErrorHandler = require("lib/genericErrorHandler");
const getStore = require("duck/store");
const {
	setDeviceRestrictions
} = require("duck/actions");

const PgTimeLimitConfiguration = extend(PgTimeLimitConfigurationDesign)(
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.initLabels = initLabels.bind(this);
		this.initListView = initListView.bind(this);
		this.refreshListView = refreshListView.bind(this);
		this.getDeviceRestrictions = getDeviceRestrictions.bind(this);
		this.updateDeviceRestrictions = updateDeviceRestrictions.bind(this);
	}
);

function onShow(superOnShow) {
	superOnShow();
}

function onLoad(superOnLoad) {
	superOnLoad();
	const page = this;
	const { svMain } = page;
	page.initLabels();
	page.initListView();
	page.getDeviceRestrictions();
	svMain.scrollBarEnabled = false;
	let listener = () => page.refreshListView();
	getStore().subscribe(listener);
}

function initListView() {
	const page = this;
	const { lvWeek } = page;
	lvWeek.rowHeight = LviTimeLimit.getHeight();
	lvWeek.refreshEnabled = false;
	lvWeek.scrollEnabled = false;
	lvWeek.onRowBind = (listViewItem, index) => {
		const state = getStore().getState();
		const currentDevice = state.devices.find((device) => device.id === state.currentDeviceID) || {};
		const currentRestriction = currentDevice.restrictions.find((restriction) => restriction.day === index + 1) || {};
		listViewItem.onToggleChanged = () => {};
		let status = typeof currentRestriction.isAllowed === "undefined" ? false : !currentRestriction.isAllowed;
		listViewItem.startTime = currentRestriction.startHour;
		listViewItem.endTime = currentRestriction.endHour;
		listViewItem.toggle = status;
		listViewItem.dayText = global.lang.weekDays[index];
		listViewItem.toggleSeparator(index !== 0);
		listViewItem.onToggleChanged = () => {
			page.updateDeviceRestrictions({
				day: global.lang.weekDays.indexOf(listViewItem.dayText) + 1,
				startHour: listViewItem.startTime,
				endHour: listViewItem.endTime,
				status
			});
		};
	};
	lvWeek.dispatch({
		type: "updateUserStyle",
		userStyle: {
			height: lvWeek.rowHeight * global.lang.weekDays.length
		}
	});
}

function refreshListView() {
	const page = this;
	const { lvWeek } = page;
	lvWeek.itemCount = global.lang.weekDays.length;
	lvWeek.refreshData();
}

function initLabels() {
	const page = this;
	const { headerBar, lblTop } = page;
	const state = getStore().getState();
	const deviceId = state.currentDeviceID;
	const currentDevice = state.devices.find((device) => device.id === deviceId);
	headerBar.title = global.lang.pgTimeLimitConfigurationHeader;
	lblTop.text = global.lang.pgTimeLimitConfigurationTopLabel.replace("$1", currentDevice.name);
}

function getDeviceRestrictions() {
	const page = this;
	return getDailyAndHourlyRestrictions()
		.then((restrictions) => {
			getStore().dispatch(setDeviceRestrictions(restrictions));
		})
		.finally(() => {
			page.refreshListView();
		});
}

function updateDeviceRestrictions({
	day,
	startHour,
	endHour,
	status
}) {
	const page = this;
	const state = getStore().getState();
	const currentDevice = state.devices.find((device) => device.id === state.currentDeviceID) || {};

	let restriction = currentDevice.restrictions.find(restriction => restriction.day === day);
	let options = {
		id: restriction && restriction.id,
		day,
		startHour,
		endHour,
		isAllowed: status
	};

	let f = restriction ? updateDailyAndHourlyRestrictions : createDailyAndHourlyRestrictions;
	return f(options)
		.then(() => {})
		.catch(genericErrorHandler)
		.finally(() => page.getDeviceRestrictions());
}

module.exports = PgTimeLimitConfiguration;
