const Application = require("sf-core/application");
const Data = require("sf-core/data");
const sc = require("./index");
const { useMockService } = require("config");

function login(username, password) {
    if (useMockService) {
        Data.setStringVariable("userToken", "DUMMY-TOKEN");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }
    return new Promise((resolve, reject) => {
        sc.request("/authentication", {
                method: "POST",
                body: {
                    username,
                    password
                }
            })
            .then(({ token }) => {
                Data.setStringVariable("userToken", token);
                resolve();
            })
            .catch(reject);
    });
}

function isLoggedIn() {
    return !!Data.getStringVariable("userToken");
}

function logout() {
    Data.removeVariable("userToken");
    Application.restart();
}

module.exports = {
    login,
    logout,
    isLoggedIn
};
