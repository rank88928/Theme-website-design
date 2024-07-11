import * as shopping_cart_function from "./shopping_operations.js"
import * as request from '../data_request.js'
import * as ui from './shopping_box.js';
import * as ui_shopping from '../UI_shopping.js'

let data_product = [];
let data_local = [];
let card;

(async () => {
    await request.check_store();
    data_product = request.data_product;
    data_local = request.data_local;

    data_product.forEach(function (data, index) {
        ui_shopping.card_generate(data_product, index);
    });

    card = document.querySelectorAll(".card");
    btn_click()
})();


//按鈕功能
function btn_click() {

    document.querySelector('.card-container').addEventListener('click', function (e) {
        console.log(e.target)

        if (e.target.classList.contains('plus')) {

            let quantity = e.target.closest('.action-btn').querySelector('.quantity');
            shopping_cart_function.increase_quantity(quantity);

        } else if (e.target.classList.contains('reduce')) {

            let quantity = e.target.closest('.action-btn').querySelector('.quantity');
            shopping_cart_function.reduce_quantity(quantity);
        } else if (e.target.classList.contains('shopping')) {

            let quantity = e.target.closest('.action-btn').querySelector('.quantity');

            shopping_cart_function.revise_order_quantity(data_product[i].id, quantity, data_product[i].name);

            quantity.value = '0';
            ui.update_cart();//重繪購物欄
        }
    })



    // let action_btn = document.querySelectorAll(".action-btn");
    // action_btn.forEach(function (action_btn, i) {

    //     let reduce_btn = action_btn.querySelector(".reduce");
    //     let plus_btn = action_btn.querySelector(".plus");
    //     let selected_quantity = action_btn.querySelector(".quantity");

    //     let shopping = action_btn.querySelector('.shopping');
    //     let icon = action_btn.querySelector('.icon');

    //     action_btn.addEventListener('click', function (e) {
    //         if (e.target === reduce_btn) {
    //             shopping_cart_function.reduce_quantity(selected_quantity);

    //         }
    //         else if (e.target === plus_btn) {
    //             shopping_cart_function.increase_quantity(selected_quantity);
    //         }

    //         else if (e.target === shopping || e.target === icon) {

    //             shopping_cart_function.revise_order_quantity(data_product[i].id, selected_quantity, data_product[i].name);
    //             selected_quantity.value = '0';
    //             ui.update_cart();//重繪購物欄
    //         }
    //     });
    // });
}


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



export { data_product, data_local }