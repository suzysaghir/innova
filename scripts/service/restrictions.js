const Data = require("sf-core/data");
const sc = require("./index");
const { useMockService } = require("config");
const getStore = require("duck/store");

function getDailyAndHourlyRestrictions() {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return Promise.resolve({
            "dailyAndHourlyRestrictions": [{
                    "id": 0,
                    "day": 0,
                    "startHour": "13:00",
                    "endHour": "19:00",
                    "isAllowed": true
                },
                {
                    "id": 0,
                    "day": 4,
                    "startHour": "17:00",
                    "endHour": "19:00",
                    "isAllowed": false
                }
            ]
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/daily-and-hourly-restrictions`, {
        method: "GET",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

function createDailyAndHourlyRestrictions({
    day,
    startHour,
    endHour,
    isAllowed
}) {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/daily-and-hourly-restrictions`, {
        method: "POST",
        headers: {
            "Token": Data.getStringVariable("userToken")
        },
        body: {
            day,
            startHour,
            endHour,
            isAllowed
        }
    });
}

function updateDailyAndHourlyRestrictions({
    id,
    day,
    startHour,
    endHour,
    isAllowed
}) {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/daily-and-hourly-restrictions/${id}`, {
        method: "PUT",
        headers: {
            "Token": Data.getStringVariable("userToken")
        },
        body: {
            day,
            startHour,
            endHour,
            isAllowed
        }
    });
}

function deleteDailyAndHourlyRestrictions(id) {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/daily-and-hourly-restrictions/${id}`, {
        method: "DELETE",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

function getDomainRestrictions() {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    "domainRestrictions": [{
                            "id": 0,
                            "domainName": "milliyet.com.tr",
                            "isAllowed": true
                        },
                        {
                            "id": 1,
                            "domainName": "hurriyet.com.tr",
                            "isAllowed": false
                        },
                        {
                            "id": 2,
                            "domainName": "sabah.com.tr",
                            "isAllowed": false
                        },
                        {
                            "id": 3,
                            "domainName": "google.com",
                            "isAllowed": false
                        },
                        {
                            "id": 4,
                            "domainName": "github.com",
                            "isAllowed": true
                        }
                    ]
                });
            }, 1000);
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/domain-restrictions`, {
        method: "GET",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

function createDomainRestrictions({ domainName, isAllowed }) {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/domain-restrictions`, {
        method: "POST",
        headers: {
            "Token": Data.getStringVariable("userToken")
        },
        body: {
            domainName,
            isAllowed
        }
    });
}

function updateDomainRestrictions({ domainRestrictionId, domainName, isAllowed }) {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/domain-restrictions/${domainRestrictionId}`, {
        method: "PUT",
        headers: {
            "Token": Data.getStringVariable("userToken")
        },
        body: {
            domainName,
            isAllowed
        }
    });
}

function deleteDomainRestrictions(domainRestrictionId) {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/domain-restrictions/${domainRestrictionId}`, {
        method: "DELETE",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

function getDomainCategoryRestrictions() {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return Promise.resolve({
            "domainCategoryRestrictions": [{
                "categoryId": 0,
                "id": 0,
                "domainCategoryName": "Social Media",
                "domainCategoryType": 0,
                "isAllowed": true
            }]
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/domain-category-restrictions`, {
        method: "GET",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

function createDomainCategoryRestrictions(domainCategoryId) {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/domain-category-restrictions`, {
        method: "POST",
        headers: {
            "Token": Data.getStringVariable("userToken")
        },
        body: {
            domainCategoryId
        }
    });
}

function deleteDomainCategoryRestrictions(domainCategoryRestrictionId) {
    const deviceID = getStore().getState().currentDeviceID;
    const accountID = getStore().getState().currentAccountID;
    if (useMockService) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
    return sc.request(`/dsl-accounts/${accountID}/devices/${deviceID}/domain-category-restrictions/${domainCategoryRestrictionId}`, {
        method: "DELETE",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

module.exports = {
    getDailyAndHourlyRestrictions,
    createDailyAndHourlyRestrictions,
    updateDailyAndHourlyRestrictions,
    deleteDailyAndHourlyRestrictions,
    getDomainRestrictions,
    createDomainRestrictions,
    updateDomainRestrictions,
    deleteDomainRestrictions,
    getDomainCategoryRestrictions,
    createDomainCategoryRestrictions,
    deleteDomainCategoryRestrictions
};
