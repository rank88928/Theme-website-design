import * as shopping_cart_function from "./shopping_operations.js"
import * as request from '../data_request.js';
import * as ui from './shopping_box.js';
import * as ui_shopping from '../UI_shopping.js'

//這裡之後要做判斷  沒資料=當前購物車是空的

let data_product = [];
let data_local = [];
let order_data = document.querySelector('.order-data');
let price_container = document.querySelector('.calculate-price-container');

// let quantity;

let data_shopping = [];


(async () => {
    await request.check_store();
    data_product = request.data_product;
    data_local = request.data_local;

    data_shopping = data_local.filter(item => item.order > 0);



    UI_update_list();
    btn_click();
})();



//購物車功能按鈕
function btn_click() {

    let reduce_btn = document.querySelectorAll(".reduce");//更新集合
    let plus_btn = document.querySelectorAll(".plus");
    // quantity = document.querySelectorAll(".quantity");
    let selected_quantity = document.querySelector(".quantity");
    let cancel_btn = document.querySelectorAll('.cancel-btn');
    let revise_btn = document.querySelectorAll('.revise');


    reduce_btn.forEach(function (reduce_btn, i) {
        reduce_btn.addEventListener("click", function () {
            console.log(selected_quantity)
            console.log(selected_quantity[i])
            shopping_cart_function.reduce_quantity(selected_quantity[i]);
        });
    });
    plus_btn.forEach(function (plus_btn, i) {
        plus_btn.addEventListener("click", function () {
            shopping_cart_function.increase_quantity(selected_quantity[i]);
        });
    });

    //修改
    revise_btn.forEach(function (revise_btn, i) {
        revise_btn.addEventListener("click", function () {
            let id = data_shopping[i].id;
            update_purchase_count(id, i);
            ui.update_cart();
        });
    });

    //刪除
    cancel_btn.forEach(function (cancel_btn, i) {
        cancel_btn.addEventListener("click", function () {
            let id = data_shopping[i].id;
            cancel_purchase_count(id, i);
            ui.update_cart();
        });
    });
}

//按鈕索引比對選購數組索引  取得商品對應序號 按序號修改
//i是選取索引
function update_purchase_count(id, i) {
    if (quantity[i].value > 0 && quantity[i].value <= data_product[id - 1].quantity) {
        data_local[id - 1].quantity += data_local[id - 1].order;
        data_local[id - 1].order = parseInt(quantity[i].value);
        data_local[id - 1].quantity -= parseInt(quantity[i].value);
        localStorage.setItem('shopping_storage', JSON.stringify(data_local));

        UI_update_list();
        btn_click();
    } else {
        console.log('異常');
    };
};
//如果按鈕數量為0 改成跳出一個提示框


//移除cancel
function cancel_purchase_count(id, i) {
    data_local[id - 1].quantity += data_local[id - 1].order;
    data_local[id - 1].order = 0;

    localStorage.setItem('shopping_storage', JSON.stringify(data_local));

    UI_update_list();
    btn_click();
};


//清單顯示
function UI_update_list() {
    let data_local = shopping_cart_function.get_shopping_storage();

    order_data.innerHTML = '';

    data_local.forEach(function (data) {
        ui_shopping.shopping_list(data);
    })

    //價格
    let sum = 0
    price_container.innerHTML = '';
    data_local.forEach(function (data, i) {
        sum += data_local[i].order * data_local[i].price;
        ui_shopping.calculate_price(data);
    })
    let item = `<div class="sum">合計:${sum}元</div>`
    price_container.insertAdjacentHTML('beforeend', item);
}
