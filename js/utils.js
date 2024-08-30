// 通用函數
export {
    reduce_qty_btn,
    increase_qty_btm,
    get_local_records,
    store_local_records,
    rendering_ui_template_strings,
    menu_card,
    shopping_box_card,
    cart_checkout_card,
    cart_price__card
}


// 減少選擇數量
function reduce_qty_btn(qty) {
    let num = parseInt(qty.value);
    if (num > 0) {
        qty.value = num - 1;
    }
}

// 增加選擇數量
function increase_qty_btm(qty) {
    let num = parseInt(qty.value);
    qty.value = num + 1;
}


//購物紀錄存取

/**
 * 按key值取得本地存儲紀錄
 * @param {} key 紀錄名稱
 * @returns 
 */
function get_local_records(key) {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * 按key值紀錄於本地儲存
 * @param {*} key 紀錄名稱
 * @param {*} data 目標資料
 */
function store_local_records(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


/**
 * 渲染模板字符串
 * @param {*} data 渲染資料
 * @param {*} html 結構
 * @param {*} target 目標css類名
 */
function rendering_ui_template_strings(data, html, target) {
    let dom = document.querySelector(target);//插入目標
    let buffer = ''; //緩存
    dom.innerHTML = '';
    data.forEach(function (item) {
        buffer += html(item);
    });

    dom.insertAdjacentHTML('beforeend', buffer)
}

function menu_card(item) {
    return `
    <li class="card card-detailed">
        <div class="img-box">
            <img src="/img/product/${item.url}.jpg">
        </div>

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
    </li> `;
}
function shopping_box_card(item) {
    return `
    <div class="item ">
        <div class="img-control">
            <img src="/img/product/${item.url}.jpg"></img>
        </div>
        <div class="txt-box">
            <p class="txt-name">${item.name}</p>
            <p class="txt-qty">數量:${item.order}</p>
        </div>
        <button class="remove-shopping">移除</button>
    </div>`;
}
function cart_checkout_card(item) {
    return `
    <li class="item">
        <div class="img-box">
            <img src="/img/product/${item.url}.jpg">
        </div>
        <div class="txt-box">  
            <div class="name">
                品項:${item.name}
            </div>
            <div class="qty">
                數量:${item.order}
            </div>
            <div class="price">
                單價:${item.price}
            </div>
        </div> 
        <div class="m-quantity-selector-box">
            <input class="reduce-btn" type="button" value="-">
            <input class="quantity-box" type="text" value="${item.order}">
            <input class="plus-btn" type="button" value="+">
            <button class="revise-btn">
                <i class="fa-solid fa-cart-shopping icon">修改數量</i>
            </button>
            <button class="clear-btn">
                <i class="fa-solid fa-rectangle-xmark">商品移除</i>
            </button>
        </div>
    </li>`;
}
function cart_price__card(item) {
    return `
    <li class="item">
        <div class="price-name">
            ${item.name}
        </div>
        <div class="price">
            共${item.order * item.price}元
        </div>
    </li>`;
}


