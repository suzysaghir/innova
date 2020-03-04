//------------------------------------------------------------------------------
//
//     This code was auto generated.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
//
//------------------------------------------------------------------------------

const extend = require('js-base/core/extend');
const PageBase = require('sf-core/ui/page');
const Page = extend(PageBase);
const pageContextPatch = require('@smartface/contx/lib/smartface/pageContextPatch');
const ScrollView = extend(require('sf-core/ui/scrollview'));
const Label = extend(require('sf-core/ui/label'));

function addChild(childName, ChildClass, pageInstance) {
	this.children = this.children || {};
	this.children[childName] = new ChildClass(pageInstance);
	if (this.layout) this.layout.addChild(this.children[childName]);
	else this.addChild(this.children[childName]);
}
// Constructor
function $PgStaticContent(_super, props) {
	// Initalizes super class for this page scope
	_super(
		this,
		Object.assign(
			{},
			{
				onLoad: onLoad.bind(this)
			},
			props || {}
		)
	);
	this.children = {};
	this.children['statusBar'] = this.statusBar || {};
	this.children['headerBar'] = this.headerBar;
	addChild.call(this, 'svMain', $SvMain_, this);
	pageContextPatch(this, 'pgStaticContent');
}
$PgStaticContent.$$styleContext = {
	classNames: '.sf-page',
	defaultClassNames: ' .default_page',
	userProps: {},
	statusBar: {
		classNames: '.sf-statusBar',
		defaultClassNames: ' .default_statusBar',
		userProps: {}
	},
	headerBar: {
		classNames: '.sf-headerBar',
		defaultClassNames: ' .default_headerBar',
		userProps: {}
	}
};
const $PgStaticContent_ = Page($PgStaticContent);
function $SvMain(_super, pageInstance) {
	_super(this);

	addChild.call(this, 'lblTitle', $SvMain$$LblTitle_, pageInstance);
	addChild.call(this, 'lblDetail', $SvMain$$LblDetail_, pageInstance);
	pageInstance.svMain = this;
}
$SvMain.$$styleContext = {
	classNames: '.sf-scrollView .grow-relative',
	defaultClassNames: '.default_common .default_scrollView',
	userProps: {}
};
const $SvMain_ = ScrollView($SvMain);
function $SvMain$$LblTitle(_super, pageInstance) {
	_super(this, { text: '  label1' });

	pageInstance.lblTitle = this;
}
$SvMain$$LblTitle.$$styleContext = {
	classNames: '.sf-label #pgStaticContent-title',
	defaultClassNames: '.default_common .default_label',
	userProps: {}
};
const $SvMain$$LblTitle_ = Label($SvMain$$LblTitle);

function $SvMain$$LblDetail(_super, pageInstance) {
	_super(this, { text: '  label1' });

	pageInstance.lblDetail = this;
}
$SvMain$$LblDetail.$$styleContext = {
	classNames: '.sf-label #pgStaticContent-detail',
	defaultClassNames: '.default_common .default_label',
	userProps: {}
};
const $SvMain$$LblDetail_ = Label($SvMain$$LblDetail);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
}

module.exports = $PgStaticContent_;
