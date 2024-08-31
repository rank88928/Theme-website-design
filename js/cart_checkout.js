import * as utils from './utils.js'
import * as shopping_fun from "./shopping_operations.js"
import * as ui from './shopping_box.js';


redraw_list()

// 按鈕
document.querySelector('.order-list').addEventListener('click', function (e) {
    let target = e.target;

    let box = target.closest('.m-quantity-selector-box');//確定點擊範圍
    if (!box) return //點擊不是操作欄範圍 直接跳出

    let qty = box.querySelector('.quantity-box');

    if (target.classList.contains('plus-btn')) {
        utils.increase_qty_btm(qty);

    } else if (target.classList.contains('reduce-btn')) {
        utils.reduce_qty_btn(qty);

    } else if (target.closest('.revise-btn')) {
        let i = shopping_fun.check_index('.revise-btn', e.target.closest('.revise-btn'));
        let shopping_records = utils.get_local_records('shopping_records');
        let id = shopping_records[i].id;
        let num = Number(qty.value);

        shopping_fun.execute_cart_action('revise_quantity', id, num)
        redraw_list()

    } else if (target.closest('.remove-btn')) {
        let i = shopping_fun.check_index('.remove-btn', e.target.closest('.remove-btn'));
        let shopping_records = utils.get_local_records('shopping_records');
        let id = shopping_records[i].id;

        shopping_fun.execute_cart_action('remove_to_cart', id)
        redraw_list()
    }
})
//更新清單顯示
function redraw_list() {

    let data = utils.get_local_records('shopping_records');
    utils.rendering_ui_template_strings(data, utils.cart_checkout_card, '.order-list')
    utils.rendering_ui_template_strings(data, utils.cart_price__card, '.price-list')

    let sum = 0;
    data.forEach(function (item) {
        sum += item.price * item.order
    });

    let total = document.querySelector('.total-price');
    total.innerHTML = '總計金額' + sum + '元';
}
