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
const Button = extend(require('sf-core/ui/button'));

const FlButtonWithIndicator = extend(
	require('../components/FlButtonWithIndicator')
);
const Materialtextbox = extend(require('materialtextbox'));

function addChild(childName, ChildClass, pageInstance) {
	this.children = this.children || {};
	this.children[childName] = new ChildClass(pageInstance);
	if (this.layout) this.layout.addChild(this.children[childName]);
	else this.addChild(this.children[childName]);
}
// Constructor
function $PgLogin(_super, props) {
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
	addChild.call(this, 'flWrapper', $FlWrapper_, this);
	addChild.call(this, 'imgTTLogo', $ImgTTLogo_, this);
	pageContextPatch(this, 'pgLogin');
}
$PgLogin.$$styleContext = {
	classNames: '.page',
	defaultClassNames: ' .default_page',
	userProps: {
		flexProps: { justifyContent: 'SPACE_AROUND' },
		paddingBottom: 20,
		paddingTop: 40
	},
	statusBar: {
		classNames: ' .sf-statusBar',
		defaultClassNames: ' .default_statusBar',
		userProps: { android: { color: 'rgba( 16, 50, 93, 1 )' } }
	},
	headerBar: {
		classNames: '.headerBar',
		defaultClassNames: ' .default_headerBar',
		userProps: { visible: false }
	}
};
const $PgLogin_ = Page($PgLogin);
function $ImgBackground(_super, pageInstance) {
	_super(this);
}
$ImgBackground.$$styleContext = {
	classNames: '.sf-imageView .grow-absoulte',
	defaultClassNames: '.default_common .default_imageView',
	userProps: { image: 'background.png', imageFillType: 'ASPECTFILL' }
};
const $ImgBackground_ = ImageView($ImgBackground);

function $ImgLogo(_super, pageInstance) {
	_super(this);

	pageInstance.imgLogo = this;
}
$ImgLogo.$$styleContext = {
	classNames: '.sf-imageView .imageView-ailemininternetilogo',
	defaultClassNames: '.default_common .default_imageView',
	userProps: {}
};
const $ImgLogo_ = ImageView($ImgLogo);

function $FlWrapper(_super, pageInstance) {
	_super(this);

	addChild.call(this, 'mtbUsername', $FlWrapper$$MtbUsername_, pageInstance);
	addChild.call(this, 'mtbPassword', $FlWrapper$$MtbPassword_, pageInstance);
	addChild.call(this, 'btnLogin', $FlWrapper$$BtnLogin_, pageInstance);
	addChild.call(
		this,
		'btnForgotPassword',
		$FlWrapper$$BtnForgotPassword_,
		pageInstance
	);
	addChild.call(this, 'btnBuy', $FlWrapper$$BtnBuy_, pageInstance);
}
$FlWrapper.$$styleContext = {
	classNames: '.sf-flexLayout #pgLogin-wrapper',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: {}
};
const $FlWrapper_ = FlexLayout($FlWrapper);
function $FlWrapper$$MtbUsername(_super, pageInstance) {
	_super(this);

	pageInstance.mtbUsername = this;
}
$FlWrapper$$MtbUsername.$$styleContext = {
	classNames: '.materialTextBox-wrapper',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: { flexProps: { positionType: 'RELATIVE' }, left: 0, top: 0 }
};
const $FlWrapper$$MtbUsername_ = Materialtextbox($FlWrapper$$MtbUsername);

function $FlWrapper$$MtbPassword(_super, pageInstance) {
	_super(this);

	pageInstance.mtbPassword = this;
}
$FlWrapper$$MtbPassword.$$styleContext = {
	classNames: '.materialTextBox-wrapper',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: { flexProps: { positionType: 'RELATIVE' }, left: 0, top: 0 }
};
const $FlWrapper$$MtbPassword_ = Materialtextbox($FlWrapper$$MtbPassword);

function $FlWrapper$$BtnLogin(_super, pageInstance) {
	_super(this);

	pageInstance.btnLogin = this;
}
$FlWrapper$$BtnLogin.$$styleContext = {
	classNames: '.sf-flexLayout .button-action',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: {}
};
const $FlWrapper$$BtnLogin_ = FlButtonWithIndicator($FlWrapper$$BtnLogin);

function $FlWrapper$$BtnForgotPassword(_super, pageInstance) {
	_super(this, { text: 'Şifremi Unuttum' });

	pageInstance.btnForgotPassword = this;
}
$FlWrapper$$BtnForgotPassword.$$styleContext = {
	classNames: '.sf-button .button-action.transparent',
	defaultClassNames: '.default_common .default_button',
	userProps: {}
};
const $FlWrapper$$BtnForgotPassword_ = Button($FlWrapper$$BtnForgotPassword);

function $FlWrapper$$BtnBuy(_super, pageInstance) {
	_super(this, { text: 'Satin Al' });

	pageInstance.btnBuy = this;
}
$FlWrapper$$BtnBuy.$$styleContext = {
	classNames: '.sf-button .button-action.transparent.white',
	defaultClassNames: '.default_common .default_button',
	userProps: {}
};
const $FlWrapper$$BtnBuy_ = Button($FlWrapper$$BtnBuy);

function $ImgTTLogo(_super, pageInstance) {
	_super(this);
}
$ImgTTLogo.$$styleContext = {
	classNames: '.sf-imageView .imageView-ttlogo',
	defaultClassNames: '.default_common .default_imageView',
	userProps: {}
};
const $ImgTTLogo_ = ImageView($ImgTTLogo);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
	this.headerBar.title = 'pgLogin';
}

module.exports = $PgLogin_;
