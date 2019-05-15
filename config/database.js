const appSetting = require('./app-setting');

module.exports = {
    database: appSetting.isProduction() ? 'YOUR_PRODCTION_MONGODB_URL' : 'mongodb://localhost:27017/meanAuth',
    secret: 'YOUR_SECRET_KEY'
}