import * as utils from "./utils.js"
import * as get_data from "./get_data.js"
import * as shopping_fun from "./shopping_operations.js"
import * as ui from './shopping_box.js'


export { data }

let data;// 完整索引

//渲染產品項目
async function render_html_menu_card() {
    let data_url = './data/product_data-11.json';
    data = await get_data.fetch_data(data_url);
    utils.rendering_ui_template_strings(data, utils.menu_card, '.card-container')

    display_mode_btn()
    btn_click()
    ui.update_cart_box()
}
render_html_menu_card()

//按鈕組
function btn_click() {
    document.querySelector('.card-container').addEventListener('click', function (e) {
        let target = e.target;
        let box = target.closest('.m-quantity-selector-box');//確定點擊範圍
        if (!box) return //點擊不是操作欄範圍 直接跳出

        let qty = box.querySelector('.quantity-box');

        if (target.classList.contains('plus-btn')) {
            utils.increase_qty_btm(qty);

        } else if (target.classList.contains('reduce-btn')) {
            utils.reduce_qty_btn(qty);

        } else if (target.closest('.shopping-btn')) {
            let i = shopping_fun.check_index('.card', e.target.closest('.card'));
            let num = Number(qty.value);
            // shopping_fun.execute_add_to_cart(data[i].id, num)
            //這個ID有問題 以後要動態data
            shopping_fun.execute_cart_action('add_to_cart', data[i].id, num)
            qty.value = '0';
        }
    })
}
//這裡有問題  以後會是動態篩選  要先提出篩選函數 

function product_filter(data,) {
    // 第一個參數 目標資料 第二個 通過函數
    data.filter(function (item) {
        // return ? === ?
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