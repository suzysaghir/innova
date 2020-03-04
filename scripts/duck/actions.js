const {
    SET_USER_INFO,
    SET_CURRENT_DSL_ACCOUNT,
    SET_ALL_DSL_ACCOUNTS,
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

module.exports = {
    setUserInfo: (userInfo) => ({
        type: SET_USER_INFO,
        userInfo
    }),
    setCurrentDslAccount: (id) => ({
        type: SET_CURRENT_DSL_ACCOUNT,
        id
    }),
    setCurrentDeviceId: (deviceId) => ({
        type: SET_CURRENT_DEVICE_ID,
        deviceId
    }),
    setAllDslAccounts: (accounts) => ({
        type: SET_ALL_DSL_ACCOUNTS,
        accounts
    }),
    setAllDevices: (devices) => ({
        type: SET_ALL_DEVICES,
        devices
    }),
    setCurrentDslAccountName: (name) => ({
        type: SET_CURRENT_DSL_ACCOUNT_NAME,
        name
    }),
    setEdnsStatusOfAccount: (isEdnsEnabled) => ({
        type: SET_EDNS_STATUS_OF_ACCOUNT,
        isEdnsEnabled
    }),
    setInternetStatusOfAccount: (isInternetEnabled) => ({
        type: SET_INTERNET_STATUS_OF_ACCOUNT,
        isInternetEnabled
    }),
    setInternetStatusOfDevice: (isInternetEnabled) => ({
        type: SET_INTERNET_STATUS_OF_DEVICE,
        isInternetEnabled
    }),
    updateDeviceName: (deviceName) => ({
        type: UPDATE_DEVICE_NAME,
        deviceName
    }),
    setDeviceRestrictions: (restrictions) => ({
        type: SET_DEVICE_RESTRICTIONS,
        restrictions
    }),
    deleteDeviceFromDSLAccount: (deviceId) => ({
        type: DELETE_DEVICE_FROM_DSL_ACCOUNT,
        deviceId
    }),
    setDeviceDomainRestrictions: (domainRestrictions) => ({
        type: SET_DEVICE_DOMAIN_RESTRICTIONS,
        domainRestrictions
    }),
    updateDevicePhoto: (avatar) => ({
        type: UPDATE_DEVICE_PHOTO,
        avatar
    }),
    setAllApplications: (applicationList, userApplicationList) => ({
        type: SET_ALL_APPLICATIONS, 
        applicationList, userApplicationList
    }),
    setAllCategories: (applicationList, userCategoryList) => ({
        type: SET_ALL_CATEGORIES, 
        applicationList, userCategoryList
    })
};
