const Application = require("sf-core/application");
const Dialog = require("sf-core/ui/dialog");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const FlWaitMain = require("components/FlWaitMain");

module.exports = (() => {
    let waitDialog = null;
    return {
        wait: () => {
            waitDialog = waitDialog || createDialog();
            Application.hideKeyboard();
            waitDialog.show();
            return {
                hide: () => waitDialog.hide()
            };
        }
    };
})();

function createDialog() {
    const content = new FlWaitMain();
    const waitDialog = new Dialog({
        android: {
            isTransparent: true,
            cancelable: false
        }
    });
    componentContextPatch(waitDialog, `dialogWait`);
    waitDialog.layout.addChild(content, "waitContent", ".wait-main");
    waitDialog.layout.applyLayout();
    return waitDialog;
}
