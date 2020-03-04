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
const ListView = extend(require('sf-core/ui/listview'));
const ListViewItem = extend(require('sf-core/ui/listviewitem'));
const actionAddChild = require('@smartface/contx/lib/smartface/action/addChild');
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
function $PgDevice(_super, props) {
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
	addChild.call(this, 'lvMain', $LvMain_, this);
	addChild.call(this, 'flInternetPlayPause', $FlInternetPlayPause_, this);
	pageContextPatch(this, 'pgDevice');
}
$PgDevice.$$styleContext = {
	classNames: '.sf-page #pgDevice',
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
const $PgDevice_ = Page($PgDevice);
function $LvMain(_super, pageInstance) {
	_super(this);
	var itemIndex = 0;
	this.onRowCreate = function() {
		var item = new ListViewItem();
		this.dispatch(actionAddChild(`item${++itemIndex}`, item));
		return item;
	};
	pageInstance.lvMain = this;
}
$LvMain.$$styleContext = {
	classNames: '.sf-listView .grow-relative #pgDevice-lvMain',
	defaultClassNames: '.default_common .default_listView',
	userProps: {}
};
const $LvMain_ = ListView($LvMain);

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

module.exports = $PgDevice_;
