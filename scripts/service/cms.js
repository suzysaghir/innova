const Data = require("sf-core/data");
const sc = require("./index");
const { useMockService } = require("config");

function sendFeedback(message) {
    if (useMockService) {
        return Promise.resolve();
    }
    return sc.request("/cms/feedback", {
        method: "POST",
        headers: {
            "Token": Data.getStringVariable("userToken")
        },
        body: {
            message
        }
    });
}

module.exports = { sendFeedback };
