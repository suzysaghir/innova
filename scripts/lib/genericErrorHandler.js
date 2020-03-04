const OS = require('sf-core/device/system').OS;

module.exports = (e) => {
    console.error(JSON.stringify(e));
    let isServiceError = !!e.body;
    if (isServiceError) {
        let allErrors = e.body.errorMessages.join("\n");
        alert(allErrors, global.lang.applicationErrorHeader);
    }
    else if (e.message) {
        alert(e.message, global.lang.applicationErrorHeader);
    }
    else {
        alert(global.lang.applicationError, global.lang.applicationErrorHeader);
    }
};
