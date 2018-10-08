require('dotenv').config();
var Sequelize = require('sequelize');

const config = {
    IP : process.env.SERVER_IP,
    SERVER_PORT : process.env.LOCAL_PORT || 8001,
    secret : 'thequickfoxjumpedofthelazydog',
    cron_timer: 5,
    seat_secure_timer: 5,
    prepare : false
}

const sequelize = new Sequelize(process.env.DB_NAME || 'WIBAS_TEST', process.env.DB_USER || 'wibas_admin', process.env.DB_PASSWORD || 'pa55w0rd', {
    host: process.env.DB_HOST || 'localhost',
    //dialect: 'postgres',
    dialect: process.env.DB_DIALECT || 'mysql',
    pool: {
        max: 1,
        min: 0,
        idle: 10000,
        acquire: 20000,
        handleDisconnects: true
    }
});

module.exports = {config : config, sequelize : sequelize};