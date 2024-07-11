
import * as ui_shopping from '../UI_shopping.js'
import * as shopping_operations from "./shopping_operations.js"
export { update_cart };


let shopping_box = document.querySelector('.shopping-item');
update_cart();



// 更新購物欄
function update_cart() {

    let data_local = JSON.parse(localStorage.getItem('shopping_storage')) || [];

    shopping_box.innerHTML = '';

    if (data_local.length == 0) {
        let item = `<div class="empty-shopping">當前購物車是空的!~~~</div>`
        shopping_box.insertAdjacentHTML('beforeend', item);
    } else {
        //有商品 最多顯示5筆
        for (let i = 0; i <= 4 && i < data_local.length; i++) {
            ui_shopping.shopping_item_create(data_local, i);
        }
    }

    let remove_btn = document.querySelectorAll(".remove-shopping");

    remove_btn.forEach(function (remove_btn, i) {
        remove_btn.addEventListener("click", function () {
            shopping_operations.clear_order_quantity(i);
            update_cart();//重繪
        });
    });
}




