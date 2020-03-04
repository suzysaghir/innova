const Color = require("sf-core/ui/color");
const FlexLayout = require("sf-core/ui/flexlayout");
const Dialog = require("sf-core/ui/dialog");
const extend = require('js-base/core/extend');
const FlButtonWithIndicatorDesign = require('library/FlButtonWithIndicator');

const FlButtonWithIndicator = extend(FlButtonWithIndicatorDesign)(
	function(_super, props = {}, pageName) {
		_super(this, props);
		this.pageName = pageName;
		var onPress;
		Object.defineProperty(this, "onPress", {
			set: value => {
				this.onTouch = value;
				onPress = value;
			},
			get: () => onPress
		});
		var text;
		Object.defineProperty(this, "text", {
			set: value => {
				this.lblText.text = value;
			},
			get: () => text
		});
		this.showIndicator = () => {
			this.__waitDialog = new Dialog({
				android: {
					isTransparent: true,
					cancelable: false
				}
			});
			this.__waitDialog.layout.alpha = 0;
			this.__waitDialog.show();
			this.indicator.dispatch({
				type: "updateUserStyle",
				userStyle: { visible: true }
			});
		};

		this.hideIndicator = () => {
			this.__waitDialog.hide();
			this.indicator.dispatch({
				type: "updateUserStyle",
				userStyle: { visible: false }
			});
		};
	}
);

module.exports = FlButtonWithIndicator;
