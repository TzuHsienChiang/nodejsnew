//8-1-1 新增 Cart 模型，這邊結束回到app.js匯入該模組並使用，建立用戶、產品、購物車彼此關連
//如同 User 模型與 Product 模型，新增 models/cart.js 檔案來製作 Cart 模型：
const Sequelize = require('sequelize');

const database = require('../utils/database');

////////////////////////////////////////////////////////////

const Cart = database.define('cart', { //這邊創建的資料庫條目會同步到遠端mysql DB
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true  //id 是這個購物車獨一的值，amount 則是該筆購物車所有的商品金額加總。
  },
	amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Cart;