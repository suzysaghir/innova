const {
    SET_USER_INFO,
    SET_ALL_DSL_ACCOUNTS,
    SET_CURRENT_DSL_ACCOUNT,
    SET_ALL_DEVICES,
    SET_CURRENT_DSL_ACCOUNT_NAME,
    SET_EDNS_STATUS_OF_ACCOUNT,
    SET_INTERNET_STATUS_OF_ACCOUNT,
    SET_INTERNET_STATUS_OF_DEVICE,
    SET_CURRENT_DEVICE_ID,
    UPDATE_DEVICE_NAME,
    SET_DEVICE_RESTRICTIONS,
    DELETE_DEVICE_FROM_DSL_ACCOUNT,
    SET_DEVICE_DOMAIN_RESTRICTIONS,
    UPDATE_DEVICE_PHOTO,
    SET_ALL_APPLICATIONS,
    SET_ALL_CATEGORIES
} = require("./constants");

module.exports = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SET_USER_INFO:
            newState = setUserInfo(state, action);
            break;
        case SET_CURRENT_DSL_ACCOUNT:
            newState = setCurrentDslAccount(state, action);
            break;
        case SET_ALL_DSL_ACCOUNTS:
            newState = setAllDslAccounts(state, action);
            break;
        case SET_ALL_DEVICES:
            newState = setAllDevices(state, action);
            break;
        case SET_CURRENT_DSL_ACCOUNT_NAME:
            newState = setCurrentDslAccountName(state, action);
            break;
        case SET_EDNS_STATUS_OF_ACCOUNT:
            newState = setEdnsStatusOfAccount(state, action);
            break;
        case SET_INTERNET_STATUS_OF_ACCOUNT:
            newState = setInternetStatusOfAccount(state, action);
            break;
        case SET_CURRENT_DEVICE_ID:
            newState = setCurrentDeviceId(state, action);
            break;
        case UPDATE_DEVICE_NAME:
            newState = updateDeviceName(state, action);
            break;
        case SET_DEVICE_RESTRICTIONS:
            newState = setDeviceRestrictions(state, action);
            break;
        case DELETE_DEVICE_FROM_DSL_ACCOUNT:
            newState = deleteDeviceFromDSLAccount(state, action);
            break;
        case SET_INTERNET_STATUS_OF_DEVICE:
            newState = setInternetStatusOfDevice(state, action);
            break;
        case SET_DEVICE_DOMAIN_RESTRICTIONS:
            newState = setDeviceDomainRestrictions(state, action);
            break;
        case UPDATE_DEVICE_PHOTO:
            newState = updateDevicePhoto(state, action);
            break;
        case SET_ALL_APPLICATIONS:
            newState = setAllApplications(state, action);
            break;
        case SET_ALL_CATEGORIES:
            newState = setAllCategories(state, action);
            break;
        default:
            newState = state;
    }
    console.info("state ", newState, "action ", action);
    return newState;
};

function setCurrentDslAccount(state, action) {
    let newState = Object.assign({}, state, { currentAccountID: action.id });
    return newState;
}

function setCurrentDeviceId(state, action) {
    let newState = Object.assign({}, state, { currentDeviceID: action.deviceId });
    return newState;
}

function setAllDslAccounts(state, action) {
    let newState = Object.assign({}, state, { accounts: action.accounts });
    return newState;
}

function setUserInfo(state, action) {
    let newState = Object.assign({}, state, { userInfo: action.userInfo });
    return newState;
}

function setAllDevices(state, action) {
    let newState = Object.assign({}, state, { devices: action.devices });
    return newState;
}

function setAllApplications(state, action) {
    let newState = Object.assign({}, state, {
        applicationList: action.applicationList.map(app => {
            let matchedApp = action.userApplicationList.find(userApp => userApp.categoryId === app.domainCategoryId);
            matchedApp && (Object.assign(app, matchedApp));
            return app;
        })
    });
    return newState;
}

function setAllCategories(state, action) {
    let newState = Object.assign({}, state, {
        applicationList: action.applicationList.map(app => {
            let matchedCategory = action.userCategoryList.find(userApp => userApp.categoryId === app.domainCategoryId);
            matchedCategory && (Object.assign(app, matchedCategory));
            return app;
        })
    });
    return newState;
}

function setCurrentDslAccountName(state, action) {
    let newState = Object.assign({}, state);
    let currentDslAccountID = newState.currentAccountID;
    let currentDslAccount = newState.accounts.find(a => a.id === currentDslAccountID);
    currentDslAccount.userDefinedName = action.name;
    return newState;
}

function setEdnsStatusOfAccount(state, action) {
    let newState = Object.assign({}, state);
    let currentDslAccountID = newState.currentAccountID;
    let currentDslAccount = newState.accounts.find(a => a.id === currentDslAccountID);
    currentDslAccount.isEdnsEnabled = action.isEdnsEnabled;
    return newState;
}

function setInternetStatusOfAccount(state, action) {
    let newState = Object.assign({}, state);
    let currentDslAccountID = newState.currentAccountID;
    let currentIsInternetEnabled = newState.accounts.find(a => a.id === currentDslAccountID);
    currentIsInternetEnabled.isInternetEnabled = action.isInternetEnabled;
    return newState;
}

function setInternetStatusOfDevice(state, action) {
    let newState = Object.assign({}, state);
    let currentDeviceID = newState.currentDeviceID;
    let currentDevice = newState.devices.find(a => a.id === currentDeviceID);
    currentDevice.isInternetEnabled = action.isInternetEnabled;
    return newState;
}

function updateDeviceName(state, action) {
    let newState = Object.assign({}, state);
    let currentDeviceID = newState.currentDeviceID;
    let currentDevice = newState.devices.find(a => a.id === currentDeviceID);
    currentDevice.name = action.deviceName;
    return newState;
}

function updateDevicePhoto(state, action) {
    let newState = Object.assign({}, state);
    let currentDeviceID = newState.currentDeviceID;
    let currentDevice = newState.devices.find(a => a.id === currentDeviceID);
    currentDevice.avatar = action.avatar;
    return newState;
}

function setDeviceRestrictions(state, action) {
    let newState = Object.assign({}, state);
    let deviceId = newState.currentDeviceID;
    let currentDevice = state.devices.find(d => d.id === deviceId) || {};
    currentDevice.restrictions = action.restrictions.dailyAndHourlyRestrictions;
    return newState;
}

function deleteDeviceFromDSLAccount(state, action) {
    let newState = Object.assign({}, state);
    let currentDeviceID = action.deviceId;
    let index = newState.devices.findIndex(a => a.id === currentDeviceID);
    newState.devices.splice(index, 1);
    return newState;
}

function setDeviceDomainRestrictions(state, action) {
    let newState = Object.assign({}, state);
    let currentDeviceID = newState.currentDeviceID;
    let currentDevice = newState.devices.find(a => a.id === currentDeviceID);
    currentDevice.domainRestrictions = action.domainRestrictions || [];
    return newState;
}
