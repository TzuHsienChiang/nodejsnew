
//5-2
//先在cmd下載npm install --save mysql2 sequelize
//再進行以下操作
const Sequelize = require('sequelize');

////////////////////////////////////////////////////////////

// const database = new Sequelize('demo', 'root', 'root', {
//     dialect: 'mysql', 
//     host: 'localhost'
// });

// 課程期間限定(~2022/5/31)遠端 DB 之後要自行操作的話要先在資料庫建立一個db //host地方輸入"localhost"或“127.0.1”即可


const database = new Sequelize ('cart-demo', 'admin', 'admin', { //demo是資料庫名字，要先在資料庫建立一個db才可以引入，admin、admin是帳號密碼
	dialect: 'mysql',
	host: '130.211.120.155' 
});


module.exports = database; 

