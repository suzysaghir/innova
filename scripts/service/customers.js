const Data = require("sf-core/data");
const sc = require("./index");
const { useMockService } = require("config");

function getUserInfo() {
    if (useMockService) {
        return Promise.resolve({
            "id": 1,
            "ttCustomerId": 13250568451,
            "firstName": "Ozan",
            "lastName": "Ertürk",
            "isEDNSActive": false,
            "isInternetRestricted": false
        });
    }
    return sc.request("/customer/customer", {
        method: "GET",
        headers: {
            "Token": Data.getStringVariable("userToken")
        }
    });
}

module.exports = { getUserInfo };
