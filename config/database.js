const appSetting = require('./app-setting');

module.exports = {
    database: appSetting.isProduction() ? 'mongodb+srv://japanbhavsar:japan@cluster0-cgm22.mongodb.net/test?retryWrites=true' : 'mongodb://localhost:27017/meanAuth',
    secret: 'secret1'
}