const Image = require("sf-core/ui/image");
const System = require("sf-core/device/system");
const extend = require('js-base/core/extend');
const LviUserDesign = require('library/LviUser');
const { BASE_URL } = require("config");

const LviUser = extend(LviUserDesign)(
	function(_super, props = {}, pageName) {
		_super(this, props);
		this.pageName = pageName;
		Object.defineProperties(this, {
			profileImage: {
				get: () => this.__icon,
				set: value => {
					if (!value)
						return;
					this.__icon = value;
					this.imgProfile.loadFromUrl({
						useHTTPCacheControl: true,
						url: BASE_URL + value,
						onSuccess: () => {
							let image = this.imgProfile.image;
							if (System.OS === "Android") {
								this.imgProfile.image = image.android.round(image.width / 2);
							}
						},
						onFailure: () => {
							let defaultImage = Image.createFromFile("images://icon_defaultphoto.png");
							this.imgProfile.image = defaultImage;
						}
					});
				}
			},
			deviceName: {
				get: () => this.__deviceName,
				set: value => this.__deviceName = this.lblDeviceName.text = value
			},
			deviceMac: {
				get: () => this.__deviceMac,
				set: value => this.__deviceMac = this.lblMac.text = value
			},
			onEditClick: {
				set: onClick => this.imgEdit.onTouchEnded = onClick
			},
			onDeleteClick: {
				set: onClick => this.imgTrash.onTouchEnded = onClick
			},
			onPhotoClick: {
				set: onClick => this.imgProfile.onTouchEnded = onClick
			}
		});
	}
);

module.exports = LviUser;
