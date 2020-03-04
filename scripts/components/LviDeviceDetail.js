const Image = require("sf-core/ui/image");
const extend = require('js-base/core/extend');
const LviDeviceDetailDesign = require('library/LviDeviceDetail');

const LviDeviceDetail = extend(LviDeviceDetailDesign)(
    function(_super, props = {}, pageName) {
        _super(this, props);
        this.pageName = pageName;
        Object.defineProperties(this, {
            icon: {
                set: value => this.imgLabel.image = Image.createFromFile("images://icon_" + value)
            },
            labelSetting: {
                get: () => this.lblSetting.text,
                set: value => this.lblSetting.text = value
            }
        });
    }
);
module.exports = LviDeviceDetail;
