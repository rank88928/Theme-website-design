
export {
    card_generate,
    shopping_item_create,
    shopping_list, calculate_price
};


// 頁面沒有元素 但因為引入 全部呼叫 待改
let card_container = document.querySelector('.card-container');
//菜單頁面列表
function card_generate(item) {
    let html =
        `<li class="card card-detailed">
            <div class="img-box">
                <img src="/img/product/${item.url}.jpg">
            </div>
            <div class="illustrate-box">
                <div class="txt-box">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="data-box">
                        <i class="fa-solid fa-fire"></i>月銷量${item.sales_volume}
                    </div>
                    <div class="price-box">
                        <div class="price">
                            售價:${item.price}
                        </div>
                        <div class="m-quantity-selector-box">
                            <input class="reduce-btn" type="button" value="-">
                            <input class="quantity-box" type="text" value="0">
                            <input class="plus-btn" type="button" value="+">
                            <button class="shopping-btn">
                                <i class="fa-solid fa-cart-shopping icon">加入購物車</i>
                            </button>
                    </div>
                </div>
                </div>
                
            </div>
        </li> `;
    card_container.insertAdjacentHTML('beforeend', html);
}
// 使用者購物車
function shopping_item_create(data_shopping, i) {
    let shopping_item = document.querySelector('.shopping-item');
    let html =
        `<div class="item ">
            <div class="img-control">
                <img src="/img/product/${data_shopping[i].url}.jpg"></img>
            </div>
            <div class="txt-box">
                <p class="txt-name">${data_shopping[i].name}</p>
                <p class="txt-qty">數量:${data_shopping[i].order}</p>
            </div>
            <button class="remove-shopping">移除</button>
        </div>`;
    shopping_item.insertAdjacentHTML('beforeend', html);
}




//購物車-1 結帳頁 商品清單
let order_data = document.querySelector('.order-data');
function shopping_list(data_shopping) {
    let html =
        `<div class="list">
            <div class="container">
                <div class="txt">  
                    <div class="name">
                        商品:${data_shopping.name}
                    </div>
                    <div class="qty">
                        數量:${data_shopping.order}
                    </div>
                    <div class="price">
                        單價:${data_shopping.price}
                    </div>
                </div> 
                <div class="control-flex">   
                    <div class="img-control">
                        <img src="/img/product/${data_shopping.url}.jpg">
                    </div>
                    <div> 
                        <div class="action-btn">
                            <input class="reduce" type="button" value="-">
                            <input class="quantity" type="text" value="${data_shopping.order}">
                            <input class="plus" type="button" value="+">
                            <button class="revise">
                                確定修改
                            </button>
                        </div>
                    </div>
                </div> 
            </div> 
            <div class="cancel">
                <button value=" " class="clear-btn" type=" ">
                    <i class="fa-solid fa-rectangle-xmark">整筆移除</i>
                </button>
            </div>
        </div>`;
    order_data.insertAdjacentHTML('beforeend', html);
};




//購物車-1 結帳頁 金額
let price_container = document.querySelector('.calculate-price-container');
function calculate_price(data) {
    let item =
        `<div class="price-container">
            <div class="price-name">
                ${data.name}
            </div>
            <div class="price">
               共${data.order * data.price}元
            </div>
        </div>`;
    price_container.insertAdjacentHTML('beforeend', item);
};
