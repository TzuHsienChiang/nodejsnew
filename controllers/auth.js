//對照git hub 5-1 
const bcryptjs = require('bcryptjs'); //7-3


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
    const errorMessage = req.flash('errorMessage')[0]; //7-2

    res.status(200)
        .render('auth/signup', {
            //pageTitle: 'Signup'
            pageTitle: 'Signup',//7-2
            errorMessage: errorMessage //7-2

        });
}

//7-2
const postSignup = (req, res) => {
    const { displayName, email, password } = req.body; //解構賦值寫法
    User.findOne({ where: { email } })
        .then((user) => {
            console.log('user', user);  //7-3-2 註冊功能(3) 使用 bcryptjs 加/解密敏感性資訊

            if (user) {
                req.flash('errorMessage', '此帳號已存在！請使用其他 Email。')
                return res.redirect('/signup');
            } else { //7-3
                //return User.create({ displayName, email, password });
                return bcryptjs.hash(password, 12)
                .then((hashedPassword) => {
                    return User.create({ displayName, email, password: hashedPassword });
                })
                .catch((err) => {
                    console.log('create new user error: ', err);
                }) //7-3
            }
        })
        .then((result) => {
            res.redirect('/login');
        })
        .catch((err) => {
            console.log('signup_error', err);
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
            //req.flash('errorMessage', '錯誤的 Email 或 Password。'); //5-8
            req.flash('errorMessage', '錯誤的 Email 或 Password。');//7-3-2
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
        //7-3-2
        bcryptjs
        .compare(password, user.password)
        .then((isMatch) => {
            console.log('isMatch', isMatch);
            if (isMatch) {
                req.session.user = user;
                req.session.isLogin = true;
                return req.session.save((err) => {
                    console.log('postLogin - save session error: ', err);
                    res.redirect('/');
                });
            }
            req.flash('errorMessage', '錯誤的 Email 或 Password。')
            res.redirect('/login');
        })
        .catch((err) => {
            return res.redirect('/login');
        }) //7-3-2
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
    postSignup //7-2

}; 
