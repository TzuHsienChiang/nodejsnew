const postCartAddItem = (req, res) => { // 為了取得sequ給我們的方法
    const { productId } = req.body; //（index.js)透過form表單post的時候，按下按鈕會trigger add-cart-item把form表單input的value全部搜集起來
    let userCart = [];// 定義在外層這樣內層都可以取用上一層接收到的資料
    let newQuantity = 1;
/*＝＝＝＝＝購物車：加入購物車，處理數量增加＝＝＝＝＝*/
/*這裡的概念：promise語法、Js作用域*/
    req.user
        .getCart() //取得user購物車整個資料模型語法
        .then((cart) => { 
            userCart = cart; //cart是字定義，取得getCart() 後的數量值，賦值給userCart
            return userCart.getProducts({ where: { id: productId }}); //拿到usercart底下所有getProducts產品
        })
        .then((products) => {
            let product;
            if (products.length > 0) {
                product = products[0];
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1; //購物車新數量＝舊購物車數量+1
                return product;
            }
            return Product.findByPk(productId);
        })
        .then((product) => { //都沒有經歷過上面的處理，就是新產品
            return userCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
/*＝＝＝＝＝下面這段再處理amount總額＝＝＝＝＝*/
        .then(() => {
            return userCart.getProducts();
        })
        .then((products) => {
            const productsSums = products.map((product) => product.price * product.cartItem.quantity);//最後得到的結果會是數字陣列:ex[20,45..]
            const amount = productsSums.reduce((accumulator, currentValue) => accumulator + currentValue); //reduce()加總
            userCart.amount = amount;//我們在cart.js有定義Usercart下面有amount
            return userCart.save();//再把上面得來的資料寫入usercart，save儲存到db裡
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => {
            console.log('postCartAddItem error: ', err);
        })
};

module.exports = {
    getIndex,
    getProduct,
    getCart,
    postCartAddItem,
}