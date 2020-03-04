const Screen = require("sf-core/device/screen");
const extend = require('js-base/core/extend');
const PgStaticContentDesign = require('ui/ui_pgStaticContent');
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");

const PgStaticContent = extend(PgStaticContentDesign)(
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.setTitle = setTitle.bind(this);
		this.setDetail = setDetail.bind(this);
	}
);

function onShow(superOnShow) {
	superOnShow();
}

function onLoad(superOnLoad) {
	superOnLoad();
	const page = this;
	const { title, detail } = page.routeData.content;
	page.headerBar.title = page.routeData.headerBarTitle;
	page.setTitle(title);
	page.setDetail(detail);
	page.svMain.layout.applyLayout();
}

function setTitle(title) {
	const page = this;
	page.lblTitle.multiline = true;
	page.lblTitle.text = title;
}

function setDetail(detail) {
	const page = this;
	const font = getCombinedStyle("#pgStaticContent-detail").font;
	const { paddingLeft, paddingRight } = getCombinedStyle("#pgStaticContent");
	const { height } = font.sizeOfString(detail, Screen.width - paddingLeft - paddingRight);
	page.lblDetail.multiline = true;
	page.lblDetail.dispatch({
		type: "updateUserStyle",
		userStyle: { height }
	});
	page.lblDetail.text = detail;
}

module.exports = PgStaticContent;
