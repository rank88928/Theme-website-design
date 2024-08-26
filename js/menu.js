
import * as get_data from "./get_data.js"
import * as shopping_function from "./shopping_operations.js"
import * as ui from './shopping_box.js';
import * as ui_shopping from '../UI_shopping.js'

// let data_product = [];

//渲染產品項目
async function render_html_menu_card() {
    let data_url = './data/product_data-11.json';
    let data = await get_data.fetch_data(data_url);

    data.forEach(function (item, i) {
        ui_shopping.card_generate(item);
    });

    display_mode_btn()
    btn_click()
}
render_html_menu_card()

//按鈕組
function btn_click() {
    document.querySelector('.card-container').addEventListener('click', function (e) {
        let target = e.target;
        let box = target.closest('.m-quantity-selector-box');//確定點擊範圍
        if (!box) return

        let qty = box.querySelector('.quantity-box');

        if (target.classList.contains('plus-btn')) {
            shopping_function.increase_quantity(qty);

        } else if (target.classList.contains('reduce-btn')) {
            shopping_function.reduce_quantity(qty);

        } else if (target.closest('.shopping-btn')) {
            let i = shopping_function.check_index('.card', e.target.closest('.card'));

            shopping_function.revise_order_quantity(data_product[i].id, qty, data_product[i].name);
            // 待改
            qty.value = '0';
            ui.update_cart();//重繪導航購物車
        }
    })
}



// 商品顯示方式切換
function display_mode_btn() {

    let display_mode_box = document.querySelector('.display-mode-box');
    let card = document.querySelectorAll('.card');

    display_mode_box.addEventListener('click', function (e) {

        let target = e.target.closest('.detailed, .simple');
        if (!target) return

        let class_name = target.className;

        if (class_name === 'detailed') {
            card.forEach(function (item) {
                item.classList.replace('card-simple', 'card-detailed')
                item.querySelector('p').style.display = '-webkit-box';
            })

        } else if (class_name === 'simple') {
            card.forEach(function (item) {
                item.classList.replace('card-detailed', 'card-simple')
                item.querySelector('p').style.display = 'none';
            })
        }
    })
}

// 側邊欄上下縮放
let cat_dropmenu = document.querySelector('.cat-dropmenu');

function expand_effect(parent_e, triggering_e, dropmenu_e) {
    parent_e.addEventListener('click', function (e) {

        let target = e.target;

        if (target.classList.contains(triggering_e)) {
            let box = target.nextElementSibling;
            box.classList.toggle('h-auto-3');
        }
    })
}
expand_effect(cat_dropmenu, 'main-cat', 'ul');