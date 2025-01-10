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
    cart_price__card,
    toolbox,
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
//加跟減其實同一種狀況 +正數或+負數 可以合併為一條功能
//改成讀自定義屬性去判斷

// 按這個邏輯 按鈕判斷可以在合併一條 同時可以再封裝一層 按鈕功能 現在是每個能修改的
// 地方都寫了邏輯 可以共同呼叫 只是傳入的最終回調函數不一樣罷了

//某些個體功能 能夠在拆分為獨立檔案 import後直接呼叫即可 分開封裝同時先判斷有沒有存在頁面上

//在做一個像面預覽介面 用假圖)(骨架屏)


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
            <button class="remove-btn">
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


// const r_toolbox = {
//     window_size: {
//         /**
//          * 響應式頁面-寬度判斷處理調用
//          * @param {給定判斷寬度} Width
//          * @param {大於該尺寸的callback} onExceed
//          * @param {小於等於該尺的寸callback} onBelowOrEqual
//          */
//         check_trigger: function (Width, onExceed, onBelowOrEqual) {

//             function handleResize() {
//                 let size_judgment = window.innerWidth - Width
//                 if (size_judgment > 0) {
//                     onExceed()
//                 } else {
//                     onBelowOrEqual()
//                 }
//             }

//             handleResize();// 初始檢查
//             window.addEventListener('resize', handleResize);//尺寸變化
//             //這裡應該有問題 大量使用時會不斷掛載 須注意
//         }
//     }
// }


const toolbox = {

    rwd_size_monitor: {
        previous_width: 0,
        size_listener: [],
        /**
        * 響應式頁面-寬度判斷處理
        * @param {給定判斷寬度} width
        * @param {大於該尺寸的callback} onExceed
        * @param {小於等於該尺的寸callback} onBelowOrEqual
        */
        size: function (width, onExceed, onBelowOrEqual) {

            function size_judgment() {
                if (previous_width === 0) {
                    //判斷是否為第一次進入
                    judgment()
                } else if (previous_width < width && window.innerWidth > width) {
                    //前次小於且本次大於
                    judgment()
                } else if (previous_width > width && window.innerWidth < width) {
                    //前次大於且本次小於
                    judgment()
                }
                //可以合併條件

                function judgment() {
                    if (window.innerWidth > width) {
                        onExceed()
                    } else {
                        onBelowOrEqual()
                    }
                }

                previous_width = window.innerWidth
            }

            if (size_listener === null) {
                size_judgment()//初始化

                window.addEventListener("resize", size_judgment)
            }
        },

        clear: function () {
            window.removeEventListener("resize", "size_judgment")
            this.previous_width = 0
        }
    },

    load_script: {
        //動態載入JS腳本
        script_init: function (url, callback) {
            let script = document.createElement('script');
            script.src = url;

            script.onload = function () {
                console.log(`Script ${url} loaded successfully.`);
                callback()
            };

            script.onerror = function () {
                console.error(`Failed to load script: ${url}`);
            };

            document.head.appendChild(script);
        }
    }
}


