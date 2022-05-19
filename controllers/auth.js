//對照git hub 5-1 


const getLogin = (req, res) => {
    res.status(200)
        //.render('login', {
        .render('auth/login', { //5-6

            path: '/login',
            pageTitle: 'Login'
        });
};

const postLogin = (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        res.redirect('/');
    } else {
        console.log('欄位尚未填寫完成！')
    }
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
