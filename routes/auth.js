//為了符合MVC架構，把有關於權限的路由單獨放一個資料夾。
//使用express提供的路由函式，把關於路由的全部搬到這，並改寫成express提供的韓式，匯出
//回到app.js import並使用

const express = require('express');
const router = express.Router();

//擷取app.vue放權限的router(把app地方換成router)
router.get('/login', (req, res) => {
    res.status(200)
        .render('login', {
            path: '/login',
            pageTitle: 'Login'
        });
});

router.post('/login', (req, res) => {
    // const { email, password } = req.body;
    // if (email && password) {
    //     res.redirect('/');
    // } else {
    //     console.log('欄位尚未填寫完成！')
    // }
    res.redirect('/')
});

router.post('/logout', (req, res) => {
    res.redirect('/login');
})


module.exports=router; //匯出模組
//接者回到在app.js使用路由檔案

    