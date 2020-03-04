const Data = require("sf-core/data");
const sc = require("./index");
const { useMockService } = require("config");
const transformOptions = require("lib/transformRequestOptions");
const getStore = require("duck/store");

function getDslAccounts() {
    if (useMockService) {
        return Promise.resolve({
            "dslAccounts": [{
                "id": 1,
                "dslNo": "10102010",
                "dslUsername": "10102010@provider.net",
                "userDefinedName": "Ofis",
                "ednsSubscriptionNumber": "1234",
                "isEdnsEnabled": false,
                "isInternetEnabled": false,
                "isModemActivated": true
            }, {
                "id": 2,
                "dslNo": "10102011",
                "dslUsername": "10102011@provider.net",
                "userDefinedName": "Kışlık",
                "ednsSubscriptionNumber": "1235",
                "isEdnsEnabled": true,
                "isInternetEnabled": true,
                "isModemActivated": true
            }]
        });
    }
    return sc.request("/dsl-accounts", {
        method: "GET",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

function updateDslAccount(options) {
    const dslAccountId = getStore().getState().currentAccountID;
    if (useMockService) {
        return Promise.resolve({});
    }
    return sc.request(`/dsl-accounts/${dslAccountId}`, {
        method: "PATCH",
        headers: {
            "Token": Data.getStringVariable("userToken")
        },
        body: transformOptions(options)
    });
}

module.exports = {
    getDslAccounts,
    updateDslAccount
};
