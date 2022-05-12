/*=======================================module require========================================*/
// 第一個區塊 內建模組
const path = require('path');

// 第二個區塊 第三方模組(套件)
const express = require('express');
const bodyParser = require('body-parser'); //form 2step:：輸入指令安裝 body-parser，接著在 app.js 匯入該模組（body-parser）


// 第三個區塊 自建模組

////////////////////////////////////////////////////////////////

const app = express();



/*=======================================middleware========================================*/

/*----------處理權限區----------*/
app.use((req, res, next) => { //app.use也是middleware，他們不是處理請求，而是權限，會寫在app.get前面，因為app.get執行完就會結束(res end)
	console.log('Hello!');
    next();
});

app.use((req, res, next) => {
	console.log('World!');
    next();
});

//在 HTML 使用靜態資源（img, css...）//
app.use(express.static(path.join(__dirname, 'publics')));

//form 3step：輸入指令安裝 body-parser，接著在 app.js 匯入該模組（body-parser)，接著在 app.js 將 body-parser 設定為 middleware
app.use(bodyParser.urlencoded({ extended: false }));

/*----------處理rq 以及 res區----------*/

app.get('/', (req, res) => {  //app.get也是middleware，是處理請求回應
        res.status(200) //網頁狀態碼 200代表請求成功 404就是fail
        .sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
    res.status(200)
        .sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/introduction', (req, res) => {
    res.status(200)
        .sendFile(path.join(__dirname, 'views', 'introduction.html'));//使用一個path的組合模組
    });
        
//from 4step:我們可以透過下面的判斷式，在確定 email 和 password 欄位都有填寫後，將使用者導頁到根頁面。
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Form Data:', req.body);
    if (email && password) {
        res.redirect('/');
    } else {
				console.log('欄位尚未填寫完成！')
    }
});



/*=======================================監聽區========================================*/

app.listen(3000, () => {
	console.log('Web Server is running on port 3000');
});
