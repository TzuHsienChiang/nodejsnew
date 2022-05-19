//對照git hub 5-1 

const User = require('../models/user');//5-6-2

const getLogin = (req, res) => {
    res.status(200)
        //.render('login', {
        .render('auth/login', { //5-6-1

            path: '/login',
            pageTitle: 'Login'
        });
};

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
            return res.redirect('/login');//沒有return就會繼續執行
        }
        if (user.password === password) { //(user.password 從資料庫勞出的=== password 使用者輸入的)
            console.log('login: 成功');
            return res.redirect('/')
        } 
        console.log('login: 找不到此 user 或密碼錯誤');
        res.redirect('/login');
    })
    .catch((err) => { //catch是偵錯系統性問題，所以資料有無寫入正確是要寫在上方
        console.log('login error:', err);  
    });
};

const postLogout = (req, res) => {
    // TODO: 實作 logout 機制
    res.redirect('/login')
}

module.exports = {
    getLogin,
    postLogin,
    postLogout,
}; 
