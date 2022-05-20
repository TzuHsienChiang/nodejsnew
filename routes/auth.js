//為了符合MVC架構，把有關於權限的路由單獨放一個資料夾。
//使用express提供的路由函式，把關於路由的全部搬到這，並改寫成express提供的韓式，匯出
//回到app.js import並使用

const express = require('express');

const authController = require('../controllers/auth'); //對照git hub 5-1 


const router = express.Router();

//擷取app.vue放權限的router(把app地方換成router)
// router.get('/login', (req, res) => {
//     res.status(200)
//         .render('login', {
//             path: '/login',
//             pageTitle: 'Login'
//         });
// });
//對照git hub 5-1 把上面改寫成下一句
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup) //7-1



// router.post('/login', (req, res) => {
//      const { email, password } = req.body;
//      if (email && password) {
//          res.redirect('/');
//      } else {
//          console.log('欄位尚未填寫完成！')
//      }
//     res.redirect('/')
// });
//對照git hub 5-1 把上面改寫成下一句
router.post('/login', authController.postLogin);

// router.post('/logout', (req, res) => {
//     res.redirect('/login');
// })

//對照git hub 5-1 把上面改寫成下一句
router.post('/logout', authController.postLogout);

router.post('/signup', authController.postSignup);


module.exports=router; //匯出模組
//接者回到在app.js使用路由檔案

    