const System = require("sf-core/device/system");
const Menu = require("sf-core/ui/menu");
const Multimedia = require("sf-core/device/multimedia");
const MenuItem = require("sf-core/ui/menuitem");
const { checkCameraPermission, checkGalleryPermission } = require("lib/permission");

function updateImage(onImagePick) {
    const page = this;
    var menu = new Menu();
    menu.headerTitle = global.lang.changeProfilePicture;
    var galleryMenuItem = new MenuItem({
        title: global.lang.chooseFromLibrary,
        onSelected: () => {
            checkGalleryPermission()
                .then(() => {
                    Multimedia.pickFromGallery({
                        type: Multimedia.Type.IMAGE,
                        allowsEditing: true,
                        aspectRatio: {
                            x: 1,
                            y: 1
                        },
                        onSuccess: ({ image }) => onImagePick(image),
                        page
                    });
                });
        }
    });
    var takePhotoMenuItem = new MenuItem({
        title: global.lang.openCamera,
        onSelected: () => {
            checkCameraPermission()
                .then(() => {
                    Multimedia.startCamera({
                        allowsEditing: true,
                        aspectRatio: {
                            x: 1,
                            y: 1
                        },
                        onSuccess: ({ image }) => onImagePick(image),
                        action: Multimedia.ActionType.IMAGE_CAPTURE,
                        page
                    });
                });
        }
    });
    var cancelMenuItem = new MenuItem({
        title: global.lang.cancel,
    });
    cancelMenuItem.ios.style = MenuItem.ios.Style.CANCEL;
    menu.items = System.OS === "iOS" ? [
        galleryMenuItem, takePhotoMenuItem, cancelMenuItem
    ] : [galleryMenuItem, takePhotoMenuItem];
    menu.show(page);
}

module.exports = updateImage;
