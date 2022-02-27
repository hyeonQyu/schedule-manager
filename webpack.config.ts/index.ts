const { merge } = require('webpack-merge');
const common = require('./common');
const prod = require('./mode/prod');
const dev = require('./mode/dev');

module.exports = function buildConfig(env, argv) {
    const { mode } = env;
    const config = {
        prod,
        dev,
    }[mode];
    return merge(common(mode), config.call(this));
};
