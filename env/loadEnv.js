module.exports = (env) => {
    const obj = {};
    Object.entries(env)
        .filter(([key]) => /^REACT_APP_/.test(key))
        .forEach(([key, value]) => {
            obj[key] = JSON.stringify(value);
        });
    return obj;
};
