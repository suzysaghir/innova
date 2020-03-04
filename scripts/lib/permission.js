/* globals SF, __SF_Dispatch */
const Location = require("sf-core/device/location");
const Application = require("sf-core/application");
const System = require("sf-core/device/system");
const Multimedia = require("sf-core/device/multimedia");
const Invocation = require('sf-core/util').Invocation;
const AVAuthorizationStatus = {
    NotDetermined: 0,
    Restricted: 1,
    Denied: 2,
    Authorized: 3,
};
const STATUS = {
    AUTH: "AUTHORIZED",
    DENIED: "DENIED",
    DONT_ASK_AGAIN: "DONT_ASK_AGAIN"
};

module.exports = {
    checkCameraPermission: () => {
        return new Promise((resolve, reject) => {
            if (System.OS === "iOS") {
                let permissionStatus = Multimedia.ios.getCameraAuthorizationStatus();

                if (permissionStatus === Multimedia.iOS.CameraAuthorizationStatus.NOTDETERMINED) {
                        let onSuccess = typeof resolve() === 'function' ? resolve() : () => {};
                        let onFailure = typeof reject() === 'function' ? reject() : () => {};
                        let argMediaType = new Invocation.Argument({
                            type: "NSString",
                            value: "vide"
                        });
                        let authStatus = Invocation.invokeClassMethod("AVCaptureDevice",
                            "authorizationStatusForMediaType:", [argMediaType], "NSInteger");
                        if (authStatus == AVAuthorizationStatus.Authorized) {
                            resolve();
                        }
                        else if (authStatus == AVAuthorizationStatus.Denied) {
                            reject();
                        }
                        else if (authStatus == AVAuthorizationStatus.Restricted) {
                            reject();
                        }
                        else if (authStatus == AVAuthorizationStatus.NotDetermined) {
                            let argCompHandler = new Invocation.Argument({
                                type: "BoolBlock",
                                value: granted => {
                                    __SF_Dispatch.mainAsync(() => granted ? resolve() : reject());
                                }
                            });
                            Invocation.invokeClassMethod("AVCaptureDevice",
                                "requestAccessForMediaType:completionHandler:", [
                                    argMediaType, argCompHandler
                                ]);
                        }
                        else {
                            reject();
                        }
                }
                else if (permissionStatus === Multimedia.iOS.CameraAuthorizationStatus.AUTHORIZED) {
                    resolve();
                }
                else {
                    reject();
                }
            }
            else {
                const CAMERA_PERMISSION_CODE = 1002;
                let preDenied = Application.android.shouldShowRequestPermissionRationale(Application.Android.Permissions.CAMERA);
                if (Application.android.checkPermission(Application.Android.Permissions.CAMERA)) {
                    resolve();
                }
                else {
                    Application.android.onRequestPermissionsResult = e => {
                        let currentDenied = Application.android.shouldShowRequestPermissionRationale(Application.Android.Permissions.CAMERA);
                        if (e.requestCode === CAMERA_PERMISSION_CODE && e.result) {
                            resolve();
                        }
                        else if (!e.result && !currentDenied && !preDenied) {
                            reject();
                        }
                        else {
                            reject();
                        }
                    };
                    Application.android.requestPermissions(CAMERA_PERMISSION_CODE, Application.Android.Permissions.CAMERA);
                }
            }
        });
    },
    checkGalleryPermission: () => {
        return new Promise((resolve, reject) => {
            if (System.OS === "iOS") {
                resolve();
            }
            else {
                const CODE = 1010;
                let preDenied = Application.android.shouldShowRequestPermissionRationale(Application.Android.Permissions.READ_EXTERNAL_STORAGE);
                if (Application.android.checkPermission(Application.Android.Permissions.READ_EXTERNAL_STORAGE)) {
                    resolve();
                }
                else {
                    Application.android.onRequestPermissionsResult = e => {
                        let currentDenied = Application.android.shouldShowRequestPermissionRationale(Application.Android.Permissions.READ_EXTERNAL_STORAGE);
                        if (e.requestCode === CODE && e.result) {
                            resolve();
                        }
                        else if (!e.result && !currentDenied && !preDenied) {
                            reject();
                        }
                        else {
                            reject();
                        }
                    };
                    Application.android.requestPermissions(CODE, Application.Android.Permissions.READ_EXTERNAL_STORAGE);
                }
            }
        });
    },
    checkLocationPermission: () => {
        return new Promise((resolve, reject) => {
            let settingsDialogShouldOpen = STATUS.DENIED;
            if (System.OS === "iOS") {
                let isLocationServicesEnable = Location.ios.locationServicesEnabled();
                let permissionStatus = Location.ios.getAuthorizationStatus();
                if (isLocationServicesEnable) {
                    if (permissionStatus === Location.iOS.AuthorizationStatus.AUTHORIZED) {
                        resolve();
                    }
                    else if (permissionStatus === Location.iOS.AuthorizationStatus.NOTDETERMINED) {
                        resolve();
                    }
                    else {
                        settingsDialogShouldOpen = STATUS.DONT_ASK_AGAIN;
                        reject(settingsDialogShouldOpen);
                    }
                }
                else {
                    settingsDialogShouldOpen = STATUS.DONT_ASK_AGAIN;
                    reject(settingsDialogShouldOpen);
                }
            }
            else { // Android
                const LOCATION_PERMISSION_CODE = 1003;
                let preDenied = Application.android.shouldShowRequestPermissionRationale(Application.Android.Permissions.ACCESS_FINE_LOCATION);
                if (Application.android.checkPermission(Application.Android.Permissions.ACCESS_FINE_LOCATION)) {
                    resolve();
                }
                else {
                    Application.android.onRequestPermissionsResult = e => {
                        let currentDenied = Application.android.shouldShowRequestPermissionRationale(Application.Android.Permissions.ACCESS_FINE_LOCATION);
                        if (e.requestCode === LOCATION_PERMISSION_CODE && e.result) {
                            resolve();
                        }
                        else if (!e.result && !currentDenied && !preDenied) {
                            settingsDialogShouldOpen = STATUS.DONT_ASK_AGAIN;
                            reject(settingsDialogShouldOpen);
                        }
                        else {
                            reject(settingsDialogShouldOpen);
                        }
                    };
                    Application.android.requestPermissions(LOCATION_PERMISSION_CODE, Application.Android.Permissions.ACCESS_FINE_LOCATION);
                }
            }
        });
    }
};
