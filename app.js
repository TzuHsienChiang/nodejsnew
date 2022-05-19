/*=======================================module require:匯入區，匯入完才可使用========================================*/
// 第一個區塊 內建模組
const path = require('path');

// 第二個區塊 第三方模組(套件)
const express = require('express');
const bodyParser = require('body-parser'); //輸入指令安裝 body-parser，接著在 app.js 匯入該模組（body-parser）


// 第三個區塊 自建模組
const authRoutes=require('./routes/auth');//匯入routes權限的模組 字定義 //0519新增修改
const shopRoutes = require('./routes/shop'); 
const errorRoutes = require('./routes/404');



////////////////////////////////////////////////////////////////

const app = express();


/*=======================================middleware========================================*/

/*----------app.use處理權限區----------*/
//app.use也是middleware，他們不是處理請求，而是權限，會寫在app.get前面，因為app.get執行完就會結束(res end)//
//app.use((req, res, next) => { 
//	console.log('Hello!');
//   next();
//});

//使用authRoutes //0519新增修改
app.use(authRoutes);
app.use(shopRoutes);
app.use(errorRoutes);



//在 HTML 使用靜態資源（img, css...）//
app.use(express.static(path.join(__dirname, 'publics')));

//輸入指令安裝 body-parser，接著在 app.js 匯入該模組（body-parser)，接著在 app.js 將 body-parser 設定為 middleware
app.use(bodyParser.urlencoded({ extended: false }));



/*----------處理rq 以及 res區----------*/
//Ejs:使用 set 方法來設定模板引擎（view engine）及模板存放的資料夾路徑（views）
app.set('view engine', 'ejs');
app.set('views', 'views'); // 預設路徑就是 views，如果沒有變動，可以省略此設定


//Ejs:設定路由的 response，先前我們使用 res.sendFile(html 檔案) 來使用 HTML 檔案。現在要改為使用 res.render(ejs 檔案) 來渲染畫面
//Ejs:在模板使用判斷式、迴圈
const products = [ //接上一判斷式練習，將宣告的 products 常數加上資料：
    {
        title: '四月是你的謊言 1',
        price: 80,
        description: '有馬公生的母親一心想把有馬培育成舉世聞名的鋼琴家，而有馬也不負母親的期望，在唸小學時就贏得許多鋼琴比賽的大獎。11歲的秋天，有馬的母親過世，從此他再也聽不見自己彈奏的鋼琴聲，沮喪的他也只好放棄演奏，但在14歲那年，經由兒時玩伴的介紹，有馬認識了小提琴手宮園薰，並被薰的自由奔放吸引，沒想到薰竟開口邀請公生在比賽時擔任她的伴奏…',
        imageUrl: 'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/062/25/0010622563.jpg&v=52dcfd21&w=348&h=348'
    },
    {
        title: '四月是你的謊言 2',
        price: 80,
        description: '公生答應在二次預賽中擔任小薰的鋼琴伴奏。比賽一開始公生還能順利彈琴，但在中途又再次因為聽不見鋼琴的聲音而停手。沒想到小薰也跟著停止演奏、等候公生。原本心灰意冷的公生因此重新振作，與小薰合奏出驚人的樂章…......',
        imageUrl: 'https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/062/31/0010623172.jpg&v=52dcfd21&w=348&h=348'
    },
    {
        title: '四月是你的謊言 3',
        price: 80,
        description: '在小薰的逼迫之下，公生不得不參加音樂比賽。為了參加比賽，公生從早到晚不停的練習，但就是無法彈奏出屬於自己的巴哈與蕭邦。此時，公生的面前出現兩位強勁的對手-相座武士與井川繪見，他們曾經是公生的手下敗將，一心想在比賽中擊敗公生雪恥。先上台演奏的武士彈奏出令全場喝采的激昂樂章…',
        imageUrl: 'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/062/76/0010627615.jpg&v=5315ab5f&w=348&h=348'
    },
];
// app.get('/', (req, res) => {  //app.get也是middleware，是處理請求回應
//         res.status(200) //網頁狀態碼 200代表請求成功 404就是fail
//         .render("index", { //和view要一個index，並渲染。render渲染指定網頁，給予以下變數
//             path:"/", //4-6 製作導覽列模板片段，目的？
//             pageTitle: 'Shopping whatever you want!!!',
//             products: products // 將常數 products 賦予給 路由參數 products
//         });
// });



// app.get('/login', (req, res) => { //0519同類的移動到routes的同類資料夾auth了
//     res.status(200)
//     .render('login', {
//         path:"/login",//
//         pageTitle: 'Login'
//     });
//         //.sendFile(path.join(__dirname, 'views', 'login.html'));
// });


app.get('/introduction', (req, res) => {
    res.status(200)
        .render("introduction",{
            path:"introduction",
            pageTitle:"intro"
        });
        //ejs加入參數之後，並指定對應的頁面（但是這會有個結果，就是只要render的頁面套用這個pageTitle變數才會印出資料，這邊這樣寫不是全域
        //.render("introduction");ejs沒有加入參數以前，上面是有傳參
        //.sendFile(path.join(__dirname, 'views', 'introduction.html'));//沒有用ejs的寫法：使用一個path的組合模組
    });


        
//我們可以透過下面的判斷式，在確定 email 和 password 欄位都有填寫後，將使用者導頁到根頁面。 //0519同類的移動到routes的同類資料夾auth了
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     console.log('Form Data:', req.body);
//     if (email && password) {
//         res.redirect('/');
//     } else {
// 				console.log('欄位尚未填寫完成！')
//     }
// });
// 實作 logout 機制 //0519同類的移動到routes的同類資料夾auth了
// app.post('/logout', (req, res) => {
//     //使用post在/logout取得資料後會重新導頁回/login(因為還沒接資料庫，所以先導回/login頁面)
//     res.redirect('/login');
// });


//萬用路由（路徑 ‘*’）能夠處理所有不匹配、不預期的路徑請求，就是如果路徑亂打的話會被導引到此頁(切記！要放在middleware最後！因為萬用路由匹配所有）：
// app.get('*', (req, res) => {
//     res.status(404)
//     .render('404', {
//         path: '*',
//         pageTitle: 'Page Not Found'
//     });
// });


/*=======================================監聽區========================================*/

app.listen(3000, () => {
	console.log('Web Server is running on port 3000');
});

