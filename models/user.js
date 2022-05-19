//5-6 新增 models/user.js 檔案，並定義它的資料結構如下：


const Sequelize = require('sequelize');

const database = require('../utils/database');

////////////////////////////////////////////////////////////

const User = database.define('user', {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    displayName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = User;

