
export { card_generate, shopping_item_create };




let card_container = document.querySelector('.card-container');
// //頁面卡片
function card_generate(data_product, i){
    let h =
    
        `<div class="card card-detailed">
            <div class="img-control">
                <img src="/img/product/${data_product[i].url}.jpg">
            </div>
            <div class="illustrate-container">
                <div class="txt-control">
                    <h3>${data_product[i].name}</h3>
                    <p>${data_product[i].description}</p>
                </div>
                <div class="price-btn">
                    <div class="price">
                        售價:${data_product[i].price}
                    </div>
                    <div class="action-btn">
                        <input class="reduce" type="button" value="-">
                        <input class="quantity" type="text" value="0">
                        <input class="plus" type="button" value="+">
                        <button class="shopping">
                            <i class="fa-solid fa-cart-shopping icon">加入購物車</i>
                        </button>
                    </div>
                </div>
            </div>
        </div> `;
    card_container.insertAdjacentHTML('beforeend', h);
}  



let shopping_item = document.querySelector('.shopping-item');
// 購物車內選項
function shopping_item_create(data_shopping, i){
    
    let item =
        `<div class="item ">
            <div class="img-control">
                <img src="/img/product/${data_shopping[i].url}.jpg">
            </div>
            <div class="txt-box">
                <p class="txt-name">${data_shopping[i].name}</p>
                <p class="txt-qty">數量:${data_shopping[i].order}</p>
            </div>
            <button class="remove-shopping">移除</button>
        </div>`;
    shopping_item.insertAdjacentHTML('beforeend', item);
}
