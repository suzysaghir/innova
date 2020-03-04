const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');
const PgLoginDesign = require('ui/ui_pgLogin');
const WebBrowser = require('sf-core/ui/webbrowser');
const config = require("config");
const authenticationService = require("service/auth");
const genericErrorHandler = require("lib/genericErrorHandler");
const waitDialog = require("lib/dialog");

const PgLogin = extend(PgLoginDesign)(
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.showInAppBrowser = showInAppBrowser.bind(this);
		this.btnLogin.text = global.lang.pgLoginButton;
		this.btnForgotPassword.text = global.lang.pgLoginForgotPassword;
		this.btnBuy.text = global.lang.pgLoginBuy;

		// TODO: Remove after test
		this.imgLogo.onTouch = () => {
			this.mtbUsername.materialTextBox.text = "5555555551";
			this.mtbPassword.materialTextBox.text = "1";
		};
	}
);

function onShow(superOnShow) {
	superOnShow();
}

function onLoad(superOnLoad) {
	superOnLoad();
	const page = this;
	page.mtbUsername.options = {
		hint: global.lang.pgLoginMail
	};
	page.mtbPassword.options = {
		hint: global.lang.pgLoginPassword,
		isPassword: true
	};
	page.btnLogin.onPress = () => {
		let username = page.mtbUsername.materialTextBox.text;
		let password = page.mtbPassword.materialTextBox.text;
		page.btnLogin.showIndicator();
		authenticationService.login(username, password)
			.then(e => {
				page.router.push("/pages/accountlist");
			})
			.catch(genericErrorHandler)
			.finally(() => page.btnLogin.hideIndicator());
	};
	page.btnForgotPassword.onPress = () => page.showInAppBrowser(config.forgotPasswordLink);
	page.btnBuy.onPress = () => page.showInAppBrowser(config.buyAppLink);
}

function showInAppBrowser(link) {
	const page = this;
	let webOptions = new WebBrowser.Options();
	webOptions.url = link;
	webOptions.barColor = Color.WHITE;
	webOptions.ios.itemColor = Color.BLACK;
	WebBrowser.show(page, webOptions);
}

module.exports = PgLogin;
