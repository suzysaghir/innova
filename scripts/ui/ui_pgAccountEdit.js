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
const Button = extend(require('sf-core/ui/button'));

const Materialtextbox = extend(require('materialtextbox'));

function addChild(childName, ChildClass, pageInstance) {
	this.children = this.children || {};
	this.children[childName] = new ChildClass(pageInstance);
	if (this.layout) this.layout.addChild(this.children[childName]);
	else this.addChild(this.children[childName]);
}
// Constructor
function $PgAccountEdit(_super, props) {
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
	addChild.call(this, 'mtbName', $MtbName_, this);
	addChild.call(this, 'btnSave', $BtnSave_, this);
	pageContextPatch(this, 'pgAccountEdit');
}
$PgAccountEdit.$$styleContext = {
	classNames: '.page #pgFeedback',
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
const $PgAccountEdit_ = Page($PgAccountEdit);
function $MtbName(_super, pageInstance) {
	_super(this);

	pageInstance.mtbName = this;
}
$MtbName.$$styleContext = {
	classNames: '.materialTextBox-wrapper',
	defaultClassNames: '.default_common .default_flexLayout',
	userProps: {}
};
const $MtbName_ = Materialtextbox($MtbName);

function $BtnSave(_super, pageInstance) {
	_super(this, { text: 'button1' });

	pageInstance.btnSave = this;
}
$BtnSave.$$styleContext = {
	classNames: '.sf-button #pgFeedback-btn',
	defaultClassNames: '.default_common .default_button',
	userProps: {}
};
const $BtnSave_ = Button($BtnSave);

/**
 * @event onLoad
 * This event is called once when page is created. You can create views and add them to page in this callback.
 */
function onLoad() {
	// HeaderBar props
}

module.exports = $PgAccountEdit_;
