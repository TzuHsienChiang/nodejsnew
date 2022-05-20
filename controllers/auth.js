//對照git hub 5-1 

const User = require('../models/user');//5-6-2

const getLogin = (req, res) => {
    const errorMessage = req.flash('errorMessage')[0]; //5-8
    
    res.status(200)
        //.render('login', {
        .render('auth/login', { //5-6-1

            path: '/login',
            //pageTitle: 'Login'
            pageTitle: 'Login', //5-8
            errorMessage
        });
};

const getSignup = (req, res) => { //7-1
    res.status(200)
        .render('auth/signup', {
            pageTitle: 'Signup'
        });
}


const postLogin = (req, res) => {
    const { email, password } = req.body;
    //解構賦值，本來要寫成const{email,password}={email:'1@1',password:'1111111'}
    // if (email && password) {
    //     res.redirect('/');
    // } else {
    //     console.log('欄位尚未填寫完成！')
    // }
    User.findOne({ where: { email }}) //5-6-2
    .then((user) => {
        if (!user) {
            console.log('login: 找不到此 user 或密碼錯誤');
            req.flash('errorMessage', '錯誤的 Email 或 Password。'); //5-8
            return res.redirect('/login');//沒有return就會繼續執行
        }
        if (user.password === password) { //(user.password 從資料庫勞出的=== password 使用者輸入的)
            console.log('login: 成功');
            req.session.isLogin = true;//5-7
            return res.redirect('/')
        } 
        console.log('login: 找不到此 user 或密碼錯誤');
        req.flash('errorMessage', '錯誤的 Email 或 Password。'); //5-8
        res.redirect('/login');
    })
    .catch((err) => { //catch是偵錯系統性問題，所以資料有無寫入正確是要寫在上方
        console.log('login error:', err);  
    });
};

// const postLogout = (req, res) => {
//     req.session.isLogin = false; //5-7
//     res.redirect('/login')
    
// }

//5-7 調整上面：登出時毀滅 session
//在執行登出功能後，session 理應被清除，所以我們來實作這個機制。打開 controllers/auth.js 來調整 postLogout：
const postLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log('session destroy() error: ', err);
        res.redirect('/login');
    });
};

module.exports = {
    getLogin,
    getSignup,
    postLogin,
    postLogout,
}; 
