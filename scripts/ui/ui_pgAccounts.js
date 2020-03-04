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
const ImageView = extend(require('sf-core/ui/imageview'));
const FlexLayout = extend(require('sf-core/ui/flexlayout'));
const Label = extend(require('sf-core/ui/label'));
const ListView = extend(require('sf-core/ui/listview'));
const actionAddChild = require('@smartface/contx/lib/smartface/action/addChild');
const LviDslAccount = extend(require('../components/LviDslAccount'));

function addChild(childName, ChildClass, pageInstance) {
	this.children = this.children || {};
	this.children[childName] = new ChildClass(pageInstance);
	if (this.layout) this.layout.addChild(this.children[childName]);
	else this.addChild(this.children[childName]);
}
// Constructor
function $PgAccounts(_super, props) {
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
	addChild.call(this, 'imgBackground', $ImgBackground_, this);
	addChild.call(this, 'imgLogo', $ImgLogo_, this);
	addChild.call(this, 'flWrapper2', $FlWrapper2_, this);
	addChild.call(this, 'flWrapper1', $FlWrapper1_, this);
	addChild.call(this, 'flInfoWrapper', $FlInfoWrapper_, this);
	pageContextPatch(this, 'pgAccounts');
}
$PgAccounts.$$styleContext = {
	classNames: '.sf-page',
	defaultClassNames: ' .default_page',
	userProps: {},
	statusBar: {
		classNames: '.sf-statusBar .statusBarAccounts',
		defaultClassNames: ' .default_statusBar',
		userProps: {}
	},
	headerBar: {
		classNames: '.sf-headerBar',
		defaultClassNames: ' .default_headerBar',
		userProps: { visible: false }
	}
};
const $PgAccounts_ = Page($PgAccounts);
function $ImgBackground(_super, pageInstance) {
	_super(this);
}
$ImgBackground.$$styleContext = {
	classNames: '.sf-imageView .grow-absoulte .imageView-familybg',
	defaultClassNames: '.default_common .default_imageView',
	userProps: {}
};
const $ImgBackground_ = ImageView($ImgBackground);

function $ImgLogo(_super, pageInstance) {
	_super(this);
}
$ImgLogo.$$styleContext = {
	classNames: '.sf-imageView .imageView-ailemininternetilogo.margin',
	defaultClassNames: '.default_common .default_imageView',
	userProps: {}
};
const $ImgLogo_ = ImageView($ImgLogo);

function $FlWrapper2(_super, pageInstance) {
	_super(this);
}
$FlWrapper2.$$styleContext = {
	classNames: '.sf-flexLayout .grow-absoulte #pgAccounts-gradient-page',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: {}
};
const $FlWrapper2_ = FlexLayout($FlWrapper2);

function $FlWrapper1(_super, pageInstance) {
	_super(this);

	addChild.call(this, 'lblChoose', $FlWrapper1$$LblChoose_, pageInstance);
	addChild.call(this, 'lvMain', $FlWrapper1$$LvMain_, pageInstance);
}
$FlWrapper1.$$styleContext = {
	classNames: '.sf-flexLayout .grow-relative #pgAccounts-gradient-layout',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: { borderRadius: 20, bottom: -20 }
};
const $FlWrapper1_ = FlexLayout($FlWrapper1);
function $FlWrapper1$$LblChoose(_super, pageInstance) {
	_super(this, { text: 'Seciniz' });

	pageInstance.lblChoose = this;
}
$FlWrapper1$$LblChoose.$$styleContext = {
	classNames: '.sf-label #pgAccounts-chooselbl',
	defaultClassNames: '.default_common .default_label',
	userProps: {}
};
const $FlWrapper1$$LblChoose_ = Label($FlWrapper1$$LblChoose);

function $FlWrapper1$$LvMain(_super, pageInstance) {
	_super(this, { itemCount: 0, rowHeight: 92 });
	var itemIndex = 0;
	this.onRowCreate = function() {
		var item = new $FlWrapper1$$LvMain$$LviDslAccount_();
		this.dispatch(actionAddChild(`item${++itemIndex}`, item));
		return item;
	};
	pageInstance.lvMain = this;
}
$FlWrapper1$$LvMain.$$styleContext = {
	classNames: '.sf-listView .grow-relative',
	defaultClassNames: '.default_common .default_listView',
	userProps: {}
};
const $FlWrapper1$$LvMain_ = ListView($FlWrapper1$$LvMain);
function $FlWrapper1$$LvMain$$LviDslAccount(_super, pageInstance) {
	_super(this);
}
$FlWrapper1$$LvMain$$LviDslAccount.$$styleContext = {
	classNames: '.sf-listViewItem',
	defaultClassNames: '.default_common .default_listViewItem',
	userProps: {
		flexProps: {
			alignContent: 'CENTER',
			justifyContent: 'CENTER',
			positionType: 'RELATIVE'
		},
		height: null,
		left: 0,
		top: 0,
		width: null
	}
};
const $FlWrapper1$$LvMain$$LviDslAccount_ = LviDslAccount(
	$FlWrapper1$$LvMain$$LviDslAccount
);

function $FlInfoWrapper(_super, pageInstance) {
	_super(this);

	addChild.call(this, 'imgInfo', $FlInfoWrapper$$ImgInfo_, pageInstance);
	pageInstance.flInfoWrapper = this;
}
$FlInfoWrapper.$$styleContext = {
	classNames: '.sf-flexLayout .flInfoWrapper',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: {}
};
const $FlInfoWrapper_ = FlexLayout($FlInfoWrapper);
function $FlInfoWrapper$$ImgInfo(_super, pageInstance) {
	_super(this);

	pageInstance.imgInfo = this;
}
$FlInfoWrapper$$ImgInfo.$$styleContext = {
	classNames: '.sf-imageView .imgInfo',
	defaultClassNames: '.default_common .default_imageView',
	userProps: {}
};
const $FlInfoWrapper$$ImgInfo_ = ImageView($FlInfoWrapper$$ImgInfo);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
	this.headerBar.title = 'pgAccounts';
}

module.exports = $PgAccounts_;
