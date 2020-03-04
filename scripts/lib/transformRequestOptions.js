function transformOptions(options) {
    let _options = options;
    if (!(options instanceof Array))
        _options = [options];
    return _options.map(o => (
        ({
            value: o.value,
            path: `/${o.key}`,
            op: "replace"
        })
    ));
}

module.exports = transformOptions;
