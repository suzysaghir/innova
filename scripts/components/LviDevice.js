const Image = require("sf-core/ui/image");
const System = require("sf-core/device/system");
const extend = require('js-base/core/extend');
const LviDeviceDesign = require('library/LviDevice');
const { BASE_URL } = require("config");

const LviDevice = extend(LviDeviceDesign)(
	function(_super, props = {}, pageName) {
		_super(this, props);
		this.pageName = pageName;

		Object.defineProperty(this, "name", {
			set: value => this.__name = this.lblTitle.text = value,
			get: () => this.__name
		});

		Object.defineProperty(this, "imageURL", {
			set: value => {
				this.imgUser.loadFromUrl({
					useHTTPCacheControl: true,
					url: this.__imageURL = BASE_URL + value,
					onSuccess: () => {
						if (System.OS === "Android") {
							let image = this.imgUser.image;
							image = image.android.round(image.width / 2);
							this.imgUser.image = image;
						}
					},
					onFailure: () => {
						let defaultImage = Image.createFromFile("images://icon_defaultphoto.png");
						this.imgUser.image = defaultImage;
					}
				});
			},
			get: () => this.__imageURL
		});
		Object.defineProperty(this, "showSeparator", {
			set: value => {
				this.flSeparator.dispatch({
					type: "updateUserStyle",
					userStyle: { visible: this.__showSeparator = value }
				});
			},
			get: () => this.__showSeparator
		});
	}
);

module.exports = LviDevice;
