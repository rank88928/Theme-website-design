import * as shopping_cart_function from "./shopping_operations.js"
import * as ui from './shopping_box.js';
import * as ui_shopping from '../UI_shopping.js'

//這裡之後要做判斷  沒資料=當前購物車是空的

UI_update_list();

// 按鈕
document.querySelector('.order-data').addEventListener('click', function (e) {

    if (e.target.classList.contains('plus')) {

        let quantity = e.target.closest('.action-btn').querySelector('.quantity');
        shopping_cart_function.increase_quantity(quantity);

    } else if (e.target.classList.contains('reduce')) {

        let quantity = e.target.closest('.action-btn').querySelector('.quantity');
        shopping_cart_function.reduce_quantity(quantity);

    } else if (e.target.closest('.revise')) {

        let i = shopping_cart_function.check_index('.list', e.target.closest('.list'))
        let quantity = e.target.closest('.action-btn').querySelector('.quantity');
        let data_local = shopping_cart_function.get_shopping_storage()
        shopping_cart_function.revise_order_quantity(data_local[i].id, quantity, data_local[i].name);
        // 計算有問題 要另外寫一種

        UI_update_list();

    } else if (e.target.closest('.clear-btn')) {

        let i = shopping_cart_function.check_index('.list', e.target.closest('.list'));

        shopping_cart_function.clear_order_quantity(i)
        UI_update_list();
    }
})





//清單顯示
// 命名要改
function UI_update_list() {
    let data_local = shopping_cart_function.get_shopping_storage();
    let order_data = document.querySelector('.order-data');
    order_data.innerHTML = '';

    data_local.forEach(function (data) {
        ui_shopping.shopping_list(data);
    })

    //價格
    let price_container = document.querySelector('.calculate-price-container');

    let sum = 0
    price_container.innerHTML = '';
    data_local.forEach(function (data, i) {
        sum += data_local[i].order * data_local[i].price;
        ui_shopping.calculate_price(data);
    })
    let item = `<div class="sum">合計:${sum}元</div>`
    price_container.insertAdjacentHTML('beforeend', item);

    ui.update_cart();
    // 按BOX 不會呼叫 要再改
}
