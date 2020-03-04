const extend = require('js-base/core/extend');
const LviDslAccountDesign = require('library/LviDslAccount');

const LviDslAccount = extend(LviDslAccountDesign)(
	function(_super, props = {}, pageName) {
		_super(this, props);
		this.pageName = pageName;

		Object.defineProperty(this, "title", {
			set: value => {
				this.lblTitle.text = this.__title = value;
			},
			get: () => this.__title
		});

		Object.defineProperty(this, "description", {
			set: value => {
				this.lblDescription.text = this.__description = value;
			},
			get: () => this.__description
		});
	}
);

module.exports = LviDslAccount;
