// 第一個區塊 內建模組
const path = require('path');

// 第二個區塊 第三方模組(套件)
const express = require('express');

// 第三個區塊 自建模組

////////////////////////////////////////////////////////////////

const app = express();



/*=======================================middleware========================================*/
/*----------在 HTML 使用靜態資源（img, css...）----------*/
app.use(express.static(path.join(__dirname, 'publics')));
/*----------處理權限----------*/
app.use((req, res, next) => { //app.use也是middleware，他們不是處理請求，而是權限，會寫在app.get前面，因為app.get執行完就會結束(res end)
	console.log('Hello!');
    next();
});

app.use((req, res, next) => {
	console.log('World!');
    next();
});
/*----------處理rq 以及 res----------*/

app.get('/', (req, res) => { //app.get也是middleware，是處理請求回應
        res.status(200) //網頁狀態碼 200代表請求成功 404就是fail
        .sendFile(path.join(__dirname, 'views', 'index.html'));
app.get('/login', (req, res) => {
    res.status(200)
        .sendFile(path.join(__dirname, 'views', 'login.html'));
    });
app.get('/introduction', (req, res) => {
    res.status(200)
        .sendFile(path.join(__dirname, 'views', 'introduction.html'));
    });
        
});



/*=======================================監聽========================================*/

app.listen(3000, () => {
	console.log('Web Server is running on port 3000');
});
