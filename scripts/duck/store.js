const { createStore } = require("redux");
const reducers = require("./reducers");

module.exports = (() => {
    let store;
    return () => store || (store = createStore(reducers));
})();
