/*=======================================module require========================================*/
// 第一個區塊 內建模組
const path = require('path');

// 第二個區塊 第三方模組(套件)
const express = require('express');
const bodyParser = require('body-parser'); //輸入指令安裝 body-parser，接著在 app.js 匯入該模組（body-parser）


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

//輸入指令安裝 body-parser，接著在 app.js 匯入該模組（body-parser)，接著在 app.js 將 body-parser 設定為 middleware
app.use(bodyParser.urlencoded({ extended: false }));



/*----------處理rq 以及 res區----------*/
//Ejs:使用 set 方法來設定模板引擎（view engine）及模板存放的資料夾路徑（views）
app.set('view engine', 'ejs');
app.set('views', 'views'); // 預設路徑就是 views，如果沒有變動，可以省略此設定

//Ejs:設定路由的 response，先前我們使用 res.sendFile(html 檔案) 來使用 HTML 檔案。現在要改為使用 res.render(ejs 檔案) 來渲染畫面：
app.get('/', (req, res) => {  //app.get也是middleware，是處理請求回應
        res.status(200) //網頁狀態碼 200代表請求成功 404就是fail
        .render("index");
        //.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
    res.status(200)
    .render("login");
        //.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/introduction', (req, res) => {
    res.status(200)
    .render("introduction");
        //.sendFile(path.join(__dirname, 'views', 'introduction.html'));//使用一個path的組合模組
    });
        
//我們可以透過下面的判斷式，在確定 email 和 password 欄位都有填寫後，將使用者導頁到根頁面。
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Form Data:', req.body);
    if (email && password) {
        res.redirect('/');
    } else {
				console.log('欄位尚未填寫完成！')
    }
});


//萬用路由（路徑 ‘*’）能夠處理所有不匹配、不預期的路徑請求，就是如果路徑亂打的話會被導引到此頁(切記！要放在middleware最後！）：
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

/*=======================================監聽區========================================*/

app.listen(3000, () => {
	console.log('Web Server is running on port 3000');
});
