require('dotenv').config();
var Sequelize = require('sequelize');
// var path = require('path');

const config = {
    IP : process.env.SERVER_IP || 'http://hrcf.icassetmanagers.com',
    PORT:process.env.SERVER_PORT || 80,
    SERVER_PORT : process.env.LOCAL_PORT || 8001,
    secret : 'thequickfoxjumpedofthelazydog',
    prepare : true
}

const sequelize = new Sequelize(process.env.DB_NAME || 'TICKET_TEST', process.env.DB_USER || 'ticket_admin', process.env.DB_PASSWORD || 'pa55w0rd', {
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