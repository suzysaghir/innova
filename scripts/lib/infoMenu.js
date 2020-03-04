const System = require("sf-core/device/system");
const Menu = require('sf-core/ui/menu');
const MenuItem = require('sf-core/ui/menuitem');
const { logout } = require("service/auth");

module.exports = (page) => {
    var menu = new Menu();
    menu.headerTitle = global.lang.infoMenuItemHeader;
    var itemAbout = new MenuItem({
        title: global.lang.infoMenuItemAbout,
        onSelected: () => {
            page.router.push("/pages/staticContent", {
                content: global.lang.staticContent.about,
                headerBarTitle: global.lang.infoMenuItemAbout
            });
        }
    });
    var itemHelp = new MenuItem({
        title: global.lang.infoMenuItemHelp,
        onSelected: () => {
            page.router.push("/pages/staticContent", {
                content: global.lang.staticContent.help,
                headerBarTitle: global.lang.infoMenuItemHelp
            });
        }
    });
    var itemAgreement = new MenuItem({
        title: global.lang.infoMenuItemAgreement,
        onSelected: () => {
            page.router.push("/pages/staticContent", {
                content: global.lang.staticContent.agreement,
                headerBarTitle: global.lang.infoMenuItemAgreement
            });
        }
    });
    var itemSendFeedback = new MenuItem({
        title: global.lang.infoMenuItemSendFeedback,
        onSelected: () => {
            page.router.push("/pages/feedback", {
                headerBarTitle: global.lang.infoMenuItemSendFeedback
            });
        }
    });
    var itemLogout = new MenuItem({
        title: global.lang.infoMenuItemLogout,
        onSelected: () => logout()
    });
    var itemCancel = new MenuItem({ title: global.lang.infoMenuItemCancel });

    itemLogout.ios.style = MenuItem.ios.Style.DESTRUCTIVE;
    itemCancel.ios.style = MenuItem.ios.Style.CANCEL;

    var items = [itemAbout, itemHelp, itemAgreement, itemSendFeedback, itemLogout];
    System.OS === "iOS" && items.push(itemCancel);
    menu.items = items;
    menu.show(page);
};
