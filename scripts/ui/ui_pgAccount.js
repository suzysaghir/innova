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
const FlexLayout = extend(require('sf-core/ui/flexlayout'));
const Label = extend(require('sf-core/ui/label'));
const Switch = extend(require('sf-core/ui/switch'));
const ScrollView = extend(require('sf-core/ui/scrollview'));
const ListView = extend(require('sf-core/ui/listview'));
const actionAddChild = require('@smartface/contx/lib/smartface/action/addChild');
const LviDevice = extend(require('../components/LviDevice'));
const FlInternetPlayPause = extend(
	require('../components/FlInternetPlayPause')
);

function addChild(childName, ChildClass, pageInstance) {
	this.children = this.children || {};
	this.children[childName] = new ChildClass(pageInstance);
	if (this.layout) this.layout.addChild(this.children[childName]);
	else this.addChild(this.children[childName]);
}
// Constructor
function $PgAccount(_super, props) {
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
	addChild.call(this, 'flWrapper', $FlWrapper_, this);
	addChild.call(this, 'svMain', $SvMain_, this);
	addChild.call(this, 'flInternetPlayPause', $FlInternetPlayPause_, this);
	pageContextPatch(this, 'pgAccount');
}
$PgAccount.$$styleContext = {
	classNames: '.sf-page #pgAccount',
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
const $PgAccount_ = Page($PgAccount);
function $FlWrapper(_super, pageInstance) {
	_super(this);

	addChild.call(this, 'lblTitle', $FlWrapper$$LblTitle_, pageInstance);
	addChild.call(
		this,
		'switchProtectionEnabled',
		$FlWrapper$$SwitchProtectionEnabled_,
		pageInstance
	);
}
$FlWrapper.$$styleContext = {
	classNames: '.sf-flexLayout #pgAccount-wrapper .shadow',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: {}
};
const $FlWrapper_ = FlexLayout($FlWrapper);
function $FlWrapper$$LblTitle(_super, pageInstance) {
	_super(this, { text: 'Aile koruma hizmeti' });

	pageInstance.lblTitle = this;
}
$FlWrapper$$LblTitle.$$styleContext = {
	classNames: '.sf-label',
	defaultClassNames: '.default_common .default_label',
	userProps: {
		flexProps: { flexGrow: 1 },
		font: {
			size: 16,
			bold: true,
			italic: false,
			family: 'SFProText',
			style: 'Semibold'
		},
		height: 60,
		textColor: 'rgba( 25, 206, 216, 1 )'
	}
};
const $FlWrapper$$LblTitle_ = Label($FlWrapper$$LblTitle);

function $FlWrapper$$SwitchProtectionEnabled(_super, pageInstance) {
	_super(this, { toggle: true });

	pageInstance.switchProtectionEnabled = this;
}
$FlWrapper$$SwitchProtectionEnabled.$$styleContext = {
	classNames: '.sf-switch',
	defaultClassNames: '.default_common .default_switch',
	userProps: {}
};
const $FlWrapper$$SwitchProtectionEnabled_ = Switch(
	$FlWrapper$$SwitchProtectionEnabled
);

function $SvMain(_super, pageInstance) {
	_super(this);

	addChild.call(this, 'lblInfo', $SvMain$$LblInfo_, pageInstance);
	addChild.call(this, 'lvMain', $SvMain$$LvMain_, pageInstance);
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

function $SvMain$$LvMain(_super, pageInstance) {
	_super(this, { rowHeight: 75 });
	var itemIndex = 0;
	this.onRowCreate = function() {
		var item = new $SvMain$$LvMain$$LviDevice_();
		this.dispatch(actionAddChild(`item${++itemIndex}`, item));
		return item;
	};
	pageInstance.lvMain = this;
}
$SvMain$$LvMain.$$styleContext = {
	classNames:
		'.sf-listView #pgDeviceApplicationRestrictions-svMain-lvApplications .shadow',
	defaultClassNames: '.default_common .default_listView',
	userProps: {}
};
const $SvMain$$LvMain_ = ListView($SvMain$$LvMain);
function $SvMain$$LvMain$$LviDevice(_super, pageInstance) {
	_super(this);
}
$SvMain$$LvMain$$LviDevice.$$styleContext = {
	classNames: '.sf-listViewItem .lviDevice',
	defaultClassNames: '.default_common .default_listViewItem',
	userProps: {
		flexProps: { positionType: 'RELATIVE' },
		left: 0,
		top: 0,
		width: null,
		height: null
	}
};
const $SvMain$$LvMain$$LviDevice_ = LviDevice($SvMain$$LvMain$$LviDevice);

function $FlInternetPlayPause(_super, pageInstance) {
	_super(this);

	pageInstance.flInternetPlayPause = this;
}
$FlInternetPlayPause.$$styleContext = {
	classNames: '.sf-flexLayout .flInternetPlayPause .shadow',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: {}
};
const $FlInternetPlayPause_ = FlInternetPlayPause($FlInternetPlayPause);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
}

module.exports = $PgAccount_;
