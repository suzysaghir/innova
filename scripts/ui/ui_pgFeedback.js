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
const Label = extend(require('sf-core/ui/label'));
const Button = extend(require('sf-core/ui/button'));

const Materialtextbox = extend(require('materialtextbox'));

function addChild(childName, ChildClass, pageInstance) {
	this.children = this.children || {};
	this.children[childName] = new ChildClass(pageInstance);
	if (this.layout) this.layout.addChild(this.children[childName]);
	else this.addChild(this.children[childName]);
}
// Constructor
function $PgFeedback(_super, props) {
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
	addChild.call(this, 'mtbMail', $MtbMail_, this);
	addChild.call(this, 'mtbMessage', $MtbMessage_, this);
	addChild.call(this, 'lblLeft', $LblLeft_, this);
	addChild.call(this, 'btnSend', $BtnSend_, this);
	pageContextPatch(this, 'pgFeedback');
}
$PgFeedback.$$styleContext = {
	classNames: '.sf-page #pgFeedback',
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
const $PgFeedback_ = Page($PgFeedback);
function $MtbMail(_super, pageInstance) {
	_super(this);

	pageInstance.mtbMail = this;
}
$MtbMail.$$styleContext = {
	classNames: '.materialTextBox-wrapper',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: {}
};
const $MtbMail_ = Materialtextbox($MtbMail);

function $MtbMessage(_super, pageInstance) {
	_super(this);

	pageInstance.mtbMessage = this;
}
$MtbMessage.$$styleContext = {
	classNames: '.materialTextBox-wrapper',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: {}
};
const $MtbMessage_ = Materialtextbox($MtbMessage);

function $LblLeft(_super, pageInstance) {
	_super(this, { text: '  500' });

	pageInstance.lblLeft = this;
}
$LblLeft.$$styleContext = {
	classNames:
		'.sf-label #pgDeviceApplicationRestrictions-svMain-lblInfo #pgFeedback-lblLeft',
	defaultClassNames: '.default_common .default_label',
	userProps: {
		flexProps: { alignSelf: 'FLEX_END', positionType: 'RELATIVE' },
		width: 71
	}
};
const $LblLeft_ = Label($LblLeft);

function $BtnSend(_super, pageInstance) {
	_super(this, { text: 'button1' });

	pageInstance.btnSend = this;
}
$BtnSend.$$styleContext = {
	classNames: '.sf-button #pgFeedback-btn',
	defaultClassNames: '.default_common .default_button',
	userProps: {}
};
const $BtnSend_ = Button($BtnSend);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
}

module.exports = $PgFeedback_;
