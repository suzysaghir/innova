const Data = require("sf-core/data");
const sc = require("./index");
const { useMockService } = require("config");
const transformOptions = require("lib/transformRequestOptions");
const getStore = require("duck/store");

function getDevicesFromDslAccount(accountID) {
    if (useMockService) {
        return Promise.resolve({
            "devices": [{
                "id": 0,
                "name": "FirstName Lastname",
                "macAddress": "00:0a:95:9d:68:16",
                "avatar": "https://avatars2.githubusercontent.com/u/13097409",
                "isInternetEnabled": true
            }, {
                "id": 1,
                "name": "Foo Bar",
                "macAddress": "00:0a:95:9d:68:42",
                "avatar": "https://avatars2.githubusercontent.com/u/13097409",
                "isInternetEnabled": true
            }]
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices`, {
        method: "GET",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

function removeDeviceFromDslAccount() {
    const accountID = getStore().getState().currentAccountID;
    const deviceID = getStore().getState().currentDeviceID;
    if (useMockService) {
        return Promise.resolve({});
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}`, {
        method: "DELETE",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

function updateDevice(options) {
    const accountID = getStore().getState().currentAccountID;
    const deviceID = getStore().getState().currentDeviceID;
    if (useMockService) {
        return Promise.resolve({});
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}`, {
        method: "PATCH",
        headers: {
            "Token": Data.getStringVariable("userToken")
        },
        body: transformOptions(options)
    });
}

function updateAvatarPhoto(profileImage) {
    const accountID = getStore().getState().currentAccountID;
    const deviceID = getStore().getState().currentDeviceID;
    if (useMockService) {
        return Promise.resolve({});
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/avatarPhoto`, {
        method: "PUT",
        headers: {
            "Token": Data.getStringVariable("userToken")
        },
        body: {
            "base64string": "data:image/jpeg;base64," + profileImage
        }
    });
}

function deleteAvatarPhoto() {
    const accountID = getStore().getState().currentAccountID;
    const deviceID = getStore().getState().currentDeviceID;
    if (useMockService) {
        return Promise.resolve({});
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/avatarPhoto`, {
        method: "DELETE",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

module.exports = {
    getDevicesFromDslAccount,
    removeDeviceFromDslAccount,
    updateDevice,
    updateAvatarPhoto,
    deleteAvatarPhoto
};
