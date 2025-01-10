import * as utils from './utils.js'
import * as shopping_fun from "./shopping_operations.js"



update_cart_box();
let shopping_item_box = document.querySelector(".shopping-item");

shopping_item_box.addEventListener('click', function (e) {
    let target = e.target;

    if (target.classList.contains('remove-shopping')) {

        let i = shopping_fun.check_index('.remove-shopping', e.target.closest('.remove-shopping'));
        let shopping_records = utils.get_local_records('shopping_records');
        let id = shopping_records[i].id;

        shopping_fun.execute_cart_action('remove_to_cart', id)
    }
})
// 更新購物欄
function update_cart_box() {
    let shopping_records = utils.get_local_records('shopping_records');
    console.log(shopping_records)
    let shopping_box = document.querySelector('.shopping-item');
    shopping_box.innerHTML = '';

    if (shopping_records.length == 0) {
        let item = `<div class="empty-shopping">當前購物車是空的!~~~</div>`
        shopping_box.insertAdjacentHTML('beforeend', item);
    } else {
        utils.rendering_ui_template_strings(shopping_records, utils.shopping_box_card, '.shopping-item')
    }
}

export { update_cart_box }
