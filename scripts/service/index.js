const ServiceCall = require("sf-extension-utils/lib/service-call");
const guid = require("sf-extension-utils/lib/guid");
const { BASE_URL } = require("config");

const sc = new ServiceCall({
    baseUrl: BASE_URL,
    logEnabled: true,
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": "tr-TR", // TODO: Language
        "GlobalId": guid(),
        "api-version": "v1"
    }
});

module.exports = exports = sc;
