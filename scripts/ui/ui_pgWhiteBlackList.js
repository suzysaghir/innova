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
const ListView = extend(require('sf-core/ui/listview'));
const actionAddChild = require('@smartface/contx/lib/smartface/action/addChild');
const LviApplication = extend(require('../components/LviApplication'));
const Materialtextbox = extend(require('materialtextbox'));

function addChild(childName, ChildClass, pageInstance) {
	this.children = this.children || {};
	this.children[childName] = new ChildClass(pageInstance);
	if (this.layout) this.layout.addChild(this.children[childName]);
	else this.addChild(this.children[childName]);
}
// Constructor
function $PgWhiteBlackList(_super, props) {
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
	this.ios && (this.ios.safeAreaLayoutMode = true);
	this.children = {};
	this.children['statusBar'] = this.statusBar || {};
	this.children['headerBar'] = this.headerBar;
	addChild.call(this, 'svMain', $SvMain_, this);
	pageContextPatch(this, 'pgWhiteBlackList');
}
$PgWhiteBlackList.$$styleContext = {
	classNames: '.sf-page #pgWhiteBlackList',
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
const $PgWhiteBlackList_ = Page($PgWhiteBlackList);
function $SvMain(_super, pageInstance) {
	_super(this, { autoSizeEnabled: true });

	addChild.call(this, 'mtbWebsite', $SvMain$$MtbWebsite_, pageInstance);
	addChild.call(this, 'lvWebsites', $SvMain$$LvWebsites_, pageInstance);
	pageInstance.svMain = this;
}
$SvMain.$$styleContext = {
	classNames: '.sf-scrollView .grow-relative',
	defaultClassNames: '.default_common .default_scrollView',
	userProps: { scrollBarEnabled: false }
};
const $SvMain_ = ScrollView($SvMain);
function $SvMain$$MtbWebsite(_super, pageInstance) {
	_super(this);

	pageInstance.mtbWebsite = this;
}
$SvMain$$MtbWebsite.$$styleContext = {
	classNames: '.materialTextBox-wrapper',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: { left: 0, top: 0 }
};
const $SvMain$$MtbWebsite_ = Materialtextbox($SvMain$$MtbWebsite);

function $SvMain$$LvWebsites(_super, pageInstance) {
	_super(this);
	var itemIndex = 0;
	this.onRowCreate = function() {
		var item = new $SvMain$$LvWebsites$$LviApplication_();
		this.dispatch(actionAddChild(`item${++itemIndex}`, item));
		return item;
	};
	pageInstance.lvWebsites = this;
}
$SvMain$$LvWebsites.$$styleContext = {
	classNames: '.sf-listView #pgWhiteBlackList-lvWebsites',
	defaultClassNames: '.default_common .default_listView',
	userProps: { height: null }
};
const $SvMain$$LvWebsites_ = ListView($SvMain$$LvWebsites);
function $SvMain$$LvWebsites$$LviApplication(_super, pageInstance) {
	_super(this);
}
$SvMain$$LvWebsites$$LviApplication.$$styleContext = {
	classNames: '.sf-listViewItem .lviApplication',
	defaultClassNames: '.default_common .default_listViewItem',
	userProps: { width: null, height: null }
};
const $SvMain$$LvWebsites$$LviApplication_ = LviApplication(
	$SvMain$$LvWebsites$$LviApplication
);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
	this.headerBar.title = 'pgWhiteBlackList';
}

module.exports = $PgWhiteBlackList_;
