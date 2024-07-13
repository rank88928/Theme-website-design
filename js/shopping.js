import * as shopping_cart_function from "./shopping_operations.js"
import * as request from '../data_request.js'
import * as ui from './shopping_box.js';
import * as ui_shopping from '../UI_shopping.js'

let data_product = [];
let card;

(async () => {
    await request.check_store();
    data_product = request.data_product;
    data_product.forEach(function (data, index) {
        ui_shopping.card_generate(data_product, index);
    });

    card = document.querySelectorAll(".card");
    btn_click()
})();


//按鈕
function btn_click() {
    document.querySelector('.card-container').addEventListener('click', function (e) {
        if (e.target.classList.contains('plus')) {

            let quantity = e.target.closest('.action-btn').querySelector('.quantity');
            shopping_cart_function.increase_quantity(quantity);

        } else if (e.target.classList.contains('reduce')) {

            let quantity = e.target.closest('.action-btn').querySelector('.quantity');
            shopping_cart_function.reduce_quantity(quantity);

        } else if (e.target.closest('.shopping')) {

            let i = shopping_cart_function.check_index('.card', e.target.closest('.card'));
            let quantity = e.target.closest('.action-btn').querySelector('.quantity');

            shopping_cart_function.revise_order_quantity(data_product[i].id, quantity, data_product[i].name);
            quantity.value = '0';
            ui.update_cart();//重繪購物欄
        }
    })
}

// 改成事件傳撥
let detailed = document.querySelector(".detailed");//詳細
let simple = document.querySelector(".simple");//簡略    
// detailed.addEventListener('click', function () {
//     menu_styles("detailed");
// });
// simple.addEventListener('click', function () {
//     menu_styles("simple");
// });

function menu_styles(style) {
    if (style == "detailed") {
        card.forEach(card => {
            card.classList.add("card-detailed");
            card.classList.remove("card-simple");
            card.querySelector("p").style.display = "block";
        });
    } else if (style == "simple") {
        card.forEach(card => {
            card.classList.add("card-simple");
            card.classList.remove("card-detailed");
            card.querySelector("p").style.display = "none";
        });
    }
}



export {
    data_product
}
