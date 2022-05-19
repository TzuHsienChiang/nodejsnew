//5-3 使用 ORM 框架 syquelize 十分簡單，首先新增 models/product.js 檔案，接著引入第三方模組 sequelize 及我們建立的 database 模組。

const Sequelize = require('sequelize');

const database = require('../utils/database');

//5-3 引入 database 模組的原因，是因為我們要用它來定義（define） Product 的資料結構，如下：

const Product = database.define('product', {
    id: { 
        type: Sequelize.INTEGER, // 資料的型別
        autoIncrement: true, // 資料是否會自動增加（一般用於 id）
        allowNull: false, // 是否接受 null 值
        primaryKey: true, // 是否為 Primary Key
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
});

module.exports = Product;

