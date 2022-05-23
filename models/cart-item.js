//8-1-2-01step 新增 CartItem 模型，並建立 User 與 Cart 與 Product 的關聯
/*新增 CartItem 模型:
首先，因為 Cart 與 Product 需要定義一張新的表單來記錄商品數量，
因此先來製作 CartItem 模型（透過 define，Sequelize 會將物件映射到資料庫建立 cartItmes 表單）：
*/

const Sequelize = require('sequelize');

const database = require('../utils/database');

////////////////////////////////////////////////////////////

const CartItem = database.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = CartItem; 