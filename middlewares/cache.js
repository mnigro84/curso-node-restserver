const getExpeditiousCache = require('express-expeditious');

const defaultOptions = {
    namespace: 'expresscache',
    defaultTtl: '1 minute'
}

const cacheInit = getExpeditiousCache(defaultOptions);

module.exports = {
    cacheInit
}