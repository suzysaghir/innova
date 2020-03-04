const Image = require("sf-core/ui/image");
const extend = require('js-base/core/extend');
const LviApplicationDesign = require('library/LviApplication');
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const { BASE_URL } = require("config");

const LviApplication = extend(LviApplicationDesign)(
	function(_super, props = {}, pageName) {
		_super(this, props);
		this.pageName = pageName;
		this.toggleSeparator = toggleSeparator.bind(this);
		Object.defineProperties(this, {
			image: {
				get: () => this.__image,
				set: (value) => {
					this.imgIcon.loadFromUrl({
						url: this.__image = BASE_URL + value,
					});
				}
			},
			smallIcon: {
				get: () => this.__smallIcon,
				set: (value) => {
					this.__icon = this.imgIcon.image = Image.createFromFile(`images://${value}`);
					this.imgIcon.dispatch({
						type: "pushClassNames",
						classNames: [".lviApplication-imgIcon.small"]
					});
				}
			},
			appName: {
				get: () => this.__appName,
				set: (value) => this.__appName = this.lblApp.text = value
			},
			status: {
				get: () => this.__status,
				set: (value) => {
					if (this.__status === value) {
						return;
					}
					this.swStatus.toggle = this.__status = value;
				}
			},
			onImageClick: {
				get: () => this.__onImageClick,
				set: (value) => {
					this.imgIcon.onTouchEnded = (isInside) => isInside && value();
					this.__onImageClick = value;
				}
			},
			onToggleChanged: {
				get: () => this.__onToggleChanged,
				set: (value) => {
					this.flSwitch.onTouchEnded = (isInside) => {
						if (isInside) {
							value();
							this.status = !this.status;
							this.__onToggleChanged = value;
						}
					};
				}
			}
		});
	}
);

function toggleSeparator(visible) {
	const component = this;
	const { flLine } = component;
	flLine.dispatch({
		type: "updateUserStyle",
		userStyle: {
			visible
		}
	});
}

module.exports = LviApplication;

LviApplication.getHeight = () => getCombinedStyle(".lviApplication").height || 0;
