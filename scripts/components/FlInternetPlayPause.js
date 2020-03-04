const AlertView = require("sf-core/ui/alertview");
const Image = require("sf-core/ui/image");
const extend = require('js-base/core/extend');
const genericErrorHandler = require("lib/genericErrorHandler");
const FlInternetPlayPauseDesign = require('library/FlInternetPlayPause');

const FlInternetPlayPause = extend(FlInternetPlayPauseDesign)(
	function(_super, props = {}, pageName) {
		_super(this, props);
		this.pageName = pageName;
		this.flMain.onTouchEnded = showConfirmationDialog.bind(this);
		Object.defineProperties(this, {
			status: {
				get: () => this.__status,
				set: value => {
					this.__status = value;
					if (value) {
						this.lblMain.text = global.lang.setInternetStatusOffline;
						this.imgIcon.image = Image.createFromFile("images://icon_pause.png");
					}
					else {
						this.lblMain.text = global.lang.setInternetStatusOnline;
						this.imgIcon.image = Image.createFromFile("images://icon_play.png");
					}
					this.flMain.dispatch({
						type: "pushClassNames",
						classNames: [value ? ".flInternetPlayPause-flMain-disable" : ".flInternetPlayPause-flMain-enable"]
					});
					this.flMain.dispatch({
						type: "removeClassName",
						className: [value ? ".flInternetPlayPause-flMain-enable" : ".flInternetPlayPause-flMain-disable"]
					});
				}
			},
			onClick: {
				set: (onClick) => this.__onClick = onClick
			},
		});
	}
);

function showConfirmationDialog() {
	alert({
		message: this.status ? global.lang.pgAccountConfirmTurnOff : global.lang.pgAccountConfirmTurnOn,
		title: global.lang.confirm,
		buttons: [{
			text: global.lang.yes,
			type: AlertView.Android.ButtonType.POSITIVE,
			onClick: () => this.__onClick(),
		}, {
			text: global.lang.no,
			type: AlertView.Android.ButtonType.NEGATIVE,
			onClick: () => {}
		}]
	});
}

module.exports = FlInternetPlayPause;
