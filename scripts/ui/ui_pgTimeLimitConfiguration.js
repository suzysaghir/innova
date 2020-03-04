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
const FlexLayout = extend(require('sf-core/ui/flexlayout'));
const Label = extend(require('sf-core/ui/label'));
const ListView = extend(require('sf-core/ui/listview'));
const actionAddChild = require('@smartface/contx/lib/smartface/action/addChild');
const LviTimeLimit = extend(require('../components/LviTimeLimit'));

function addChild(childName, ChildClass, pageInstance) {
	this.children = this.children || {};
	this.children[childName] = new ChildClass(pageInstance);
	if (this.layout) this.layout.addChild(this.children[childName]);
	else this.addChild(this.children[childName]);
}
// Constructor
function $PgTimeLimitConfiguration(_super, props) {
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
	pageContextPatch(this, 'pgTimeLimitConfiguration');
}
$PgTimeLimitConfiguration.$$styleContext = {
	classNames: '.sf-page #pgTimeLimitConfiguration',
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
const $PgTimeLimitConfiguration_ = Page($PgTimeLimitConfiguration);
function $SvMain(_super, pageInstance) {
	_super(this);

	addChild.call(this, 'flTopLabel', $SvMain$$FlTopLabel_, pageInstance);
	addChild.call(this, 'lvWeek', $SvMain$$LvWeek_, pageInstance);
	pageInstance.svMain = this;
}
$SvMain.$$styleContext = {
	classNames: '.sf-scrollView .grow-relative',
	defaultClassNames: '.default_common .default_scrollView',
	userProps: {}
};
const $SvMain_ = ScrollView($SvMain);
function $SvMain$$FlTopLabel(_super, pageInstance) {
	_super(this);

	addChild.call(this, 'lblTop', $SvMain$$FlTopLabel$$LblTop_, pageInstance);
}
$SvMain$$FlTopLabel.$$styleContext = {
	classNames: '.sf-flexLayout #pgTimeLimitConfiguration-flTopLabel',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: {}
};
const $SvMain$$FlTopLabel_ = FlexLayout($SvMain$$FlTopLabel);
function $SvMain$$FlTopLabel$$LblTop(_super, pageInstance) {
	_super(this, {
		text:
			'“Oğlumun Telefonu” adlı cihazın erişimini engellemek istediğiniz zaman aralıklarını seçiniz'
	});

	pageInstance.lblTop = this;
}
$SvMain$$FlTopLabel$$LblTop.$$styleContext = {
	classNames: '.sf-label .grow-relative #pgTimeLimitConfiguration-labelTop',
	defaultClassNames: '.default_common .default_label',
	userProps: {}
};
const $SvMain$$FlTopLabel$$LblTop_ = Label($SvMain$$FlTopLabel$$LblTop);

function $SvMain$$LvWeek(_super, pageInstance) {
	_super(this);
	var itemIndex = 0;
	this.onRowCreate = function() {
		var item = new $SvMain$$LvWeek$$LviTimeLimit_();
		this.dispatch(actionAddChild(`item${++itemIndex}`, item));
		return item;
	};
	pageInstance.lvWeek = this;
}
$SvMain$$LvWeek.$$styleContext = {
	classNames: '.sf-listView #pgTimeLimitConfiguration-lvWeek',
	defaultClassNames: '.default_common .default_listView',
	userProps: { height: 0 }
};
const $SvMain$$LvWeek_ = ListView($SvMain$$LvWeek);
function $SvMain$$LvWeek$$LviTimeLimit(_super, pageInstance) {
	_super(this);
}
$SvMain$$LvWeek$$LviTimeLimit.$$styleContext = {
	classNames: '.sf-listViewItem .lviTimeLimit',
	defaultClassNames: '.default_common .default_listViewItem',
	userProps: {
		flexProps: { positionType: 'RELATIVE' },
		left: 0,
		top: 0,
		width: null,
		height: null
	}
};
const $SvMain$$LvWeek$$LviTimeLimit_ = LviTimeLimit(
	$SvMain$$LvWeek$$LviTimeLimit
);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
}

module.exports = $PgTimeLimitConfiguration_;
