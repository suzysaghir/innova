const AlertView = require("sf-core/ui/alertview");
const extend = require('js-base/core/extend');
const PgFeedbackDesign = require('ui/ui_pgFeedback');
const touch = require("sf-extension-utils/lib/touch");
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const { sendFeedback } = require("service/cms");
const waitDialog = require("lib/dialog");
const genericErrorHandler = require("lib/genericErrorHandler");
const { MAX_CHARACTERS_OF_FEEDBACK } = require("config");

const PgFeedback = extend(PgFeedbackDesign)(
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.showSuccessAlert = showSuccessAlert.bind(this);
		this.setEmailError = setEmailError.bind(this);
		this.setMessageError = setMessageError.bind(this);

		this.btnSend.text = global.lang.pgFeedbackSend;
		this.ios.onSafeAreaPaddingChange = ({ bottom }) => {
			let currentBottom = getCombinedStyle("#pgFeedback-btn").bottom;
			let newBottom = bottom + currentBottom;
			this.btnSend.dispatch({
				type: "updateUserStyle",
				userStyle: { bottom: newBottom }
			});
		};
	}
);

function onShow(superOnShow) {
	superOnShow();
}


function onLoad(superOnLoad) {
	superOnLoad();
	let currentMessage = "";
	const page = this;

	touch.addPressEvent(page.btnSend, () => {
		const page = this;
		const emailValid = checkEmailValid(page.mtbMail.materialTextBox.text);
		const messageValid = checkMessageValid(page.mtbMessage.materialTextBox.text);

		page.setEmailError(emailValid);
		page.setMessageError(messageValid);

		if (!emailValid || !messageValid) return;

		let dialog = waitDialog.wait();
		let message = page.mtbMessage.materialTextBox.text;
		sendFeedback(message)
			.then(() => page.showSuccessAlert(global.lang.pgFeedbackSuccess))
			.catch(genericErrorHandler)
			.finally(() => dialog.hide());
	});
	page.headerBar.title = page.routeData.headerBarTitle;
	page.mtbMail.options = {
		hint: global.lang.pgFeedbackMail,
		onTextChanged: (e) => {
			const emailValid = checkEmailValid(page.mtbMail.materialTextBox.text);
			page.setEmailError(emailValid);
		}
	};
	page.mtbMessage.options = {
		hint: global.lang.pgFeedbackMessage,
		onTextChanged: (e) => {
			const messageValid = checkMessageValid(page.mtbMessage.materialTextBox.text);
			page.setMessageError(messageValid);
			const wordCount = MAX_CHARACTERS_OF_FEEDBACK - page.mtbMessage.materialTextBox.text.length;
			
			if (wordCount === 0) page.currentMessage = page.mtbMessage.materialTextBox.text;
			if (wordCount < 0) {
				page.mtbMessage.materialTextBox.text = page.currentMessage;
				return;
			}
			page.lblLeft.text = wordCount;
		}
	};
	[
		page.mtbMail.materialTextBox,
		page.mtbMessage.materialTextBox
	]
	.forEach(mtb => mtb.dispatch({
		type: "pushClassNames",
		classNames: [".materialTextBox.feedback"]
	}));
}

function showSuccessAlert(successMessage) {
	const page = this;
	alert({
		title: "",
		message: successMessage,
		buttons: [{
			type: AlertView.Android.ButtonType.POSITIVE,
			text: global.lang.ok,
			onClick: () => page.router.goBack()
		}]
	});
}

function checkEmailValid(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function checkMessageValid(message) {
	if (message.length === 0) {
		return false;
	}
	else {
		return true;
	}
}

function setEmailError(isValid) {
	const page = this;
	page.mtbMail.materialTextBox.errorMessage = !isValid ? global.lang.pgFeedbackEmailErrorMessage : "";
}

function setMessageError(isValid) {
	const page = this;
	page.mtbMessage.materialTextBox.errorMessage = !isValid ? global.lang.pgFeedbackMessageErrorMessage : "";
}

module.exports = PgFeedback;
