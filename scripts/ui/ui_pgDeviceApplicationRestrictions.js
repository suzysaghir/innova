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
const ListView = extend(require('sf-core/ui/listview'));
const actionAddChild = require('@smartface/contx/lib/smartface/action/addChild');
const LviApplication = extend(require('../components/LviApplication'));

function addChild(childName, ChildClass, pageInstance) {
	this.children = this.children || {};
	this.children[childName] = new ChildClass(pageInstance);
	if (this.layout) this.layout.addChild(this.children[childName]);
	else this.addChild(this.children[childName]);
}
// Constructor
function $PgDeviceApplicationRestrictions(_super, props) {
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
	pageContextPatch(this, 'pgDeviceApplicationRestrictions');
}
$PgDeviceApplicationRestrictions.$$styleContext = {
	classNames: '.sf-page #pgDeviceApplicationRestrictions',
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
const $PgDeviceApplicationRestrictions_ = Page(
	$PgDeviceApplicationRestrictions
);
function $SvMain(_super, pageInstance) {
	_super(this, { autoSizeEnabled: true });

	addChild.call(this, 'lblInfo', $SvMain$$LblInfo_, pageInstance);
	addChild.call(this, 'lvApplications', $SvMain$$LvApplications_, pageInstance);
	pageInstance.svMain = this;
}
$SvMain.$$styleContext = {
	classNames: '.sf-scrollView .grow-relative',
	defaultClassNames: '.default_common .default_scrollView',
	userProps: {}
};
const $SvMain_ = ScrollView($SvMain);
function $SvMain$$LblInfo(_super, pageInstance) {
	_super(this, {
		text:
			'"Oğlumun Telefonu" adlı cihazın erşimini engellemek istediğiniz uygulamaları seçiniz'
	});

	pageInstance.lblInfo = this;
}
$SvMain$$LblInfo.$$styleContext = {
	classNames: '.sf-label #pgDeviceApplicationRestrictions-svMain-lblInfo',
	defaultClassNames: '.default_common .default_label',
	userProps: {}
};
const $SvMain$$LblInfo_ = Label($SvMain$$LblInfo);

function $SvMain$$LvApplications(_super, pageInstance) {
	_super(this);
	var itemIndex = 0;
	this.onRowCreate = function() {
		var item = new $SvMain$$LvApplications$$LviApplication_();
		this.dispatch(actionAddChild(`item${++itemIndex}`, item));
		return item;
	};
	pageInstance.lvApplications = this;
}
$SvMain$$LvApplications.$$styleContext = {
	classNames:
		'.sf-listView #pgDeviceApplicationRestrictions-svMain-lvApplications',
	defaultClassNames: '.default_common .default_listView',
	userProps: {}
};
const $SvMain$$LvApplications_ = ListView($SvMain$$LvApplications);
function $SvMain$$LvApplications$$LviApplication(_super, pageInstance) {
	_super(this);
}
$SvMain$$LvApplications$$LviApplication.$$styleContext = {
	classNames: '.sf-listViewItem .lviApplication',
	defaultClassNames: '.default_common .default_listViewItem',
	userProps: { width: null, height: null }
};
const $SvMain$$LvApplications$$LviApplication_ = LviApplication(
	$SvMain$$LvApplications$$LviApplication
);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
}

module.exports = $PgDeviceApplicationRestrictions_;
