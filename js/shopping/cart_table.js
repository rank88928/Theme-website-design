import { update_cart_box } from "./cart_box.js";
import { revise_input_num } from "../utils.js";
import { update_cart, delete_cart, get_complete_cart_data } from "./cart_actions.js";
import "../module/index.js";
import { add_order } from "../api/firebase_order_api.js";
import { user_data, verify_id } from "../auth/user.js";

let display_data = [];
let tbody = document.querySelector("tbody");
let total_order_amount;
let order_btn = document.querySelector(".order-btn");

async function click_add_order() {
  let uid = verify_id();

  if (!uid) {
    console.log("未登入");
    return;
  }

  let order_data = display_data.map((item) => {
    return {
      id: item.key,
      order_sum: item.order,
    };
  });

  try {
    await add_order(uid, order_data, display_data);
  } catch (error) {
    return;
  }

  localStorage.removeItem("shopping_records");
  ui_update();
}

function update_table() {
  function tr_html(item) {
    return `<tr class="text-center border" data-index="${item.id}">
              <td ><img src="${item.img}" class="w-16 h-16 object-cover" /></td>
              <td class="name" >${item.name}</td>
              <td class="price">${item.price}</td>
              <td class="order">
              <div class="m-quantity-selector-box">
                <input class="reduce-btn" type="button" value="-">
                <input class="quantity-box" type="text" value="${item.order}"  min="1">
                <input class="plus-btn" type="button" value="+">
              </div>

              </td>
              <td class="subtotal">${item.subtotal}元</td>
              <td class="delete">
                <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
                移除該商品
                </button>
              </td>
            </tr>`;
  }

  let buffer_html = "";
  display_data.forEach((item) => {
    buffer_html += tr_html(item);
  });
  tbody.innerHTML = buffer_html;
}

function update_total_amount() {
  let total = 0;
  display_data.forEach((item) => {
    total += item.subtotal;
  });
  total_order_amount = total;

  let amount = document.querySelector(".amount");
  amount.innerHTML = total_order_amount + "元";

  console.log(display_data);
}

async function ui_update() {
  display_data = await get_complete_cart_data();
  update_table();
  update_cart_box();
  update_total_amount();
}

(async function init_data() {
  display_data = await get_complete_cart_data();

  if (display_data.length !== 0) {
    ui_update();
  } else {
  }
})();

document.querySelector("table").addEventListener("click", function (e) {
  let target = e.target;

  if (target.classList.contains("plus-btn")) {
    let box = target.closest(".m-quantity-selector-box");
    let qty_input = box.querySelector(".quantity-box");
    revise_input_num(qty_input, 1);
    qty_input.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (target.classList.contains("reduce-btn")) {
    let box = target.closest(".m-quantity-selector-box");
    let qty_input = box.querySelector(".quantity-box");
    if (Number(qty_input.value) === 1) return;
    revise_input_num(qty_input, -1);
    qty_input.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (target.closest(".delete-btn")) {
    let id = target.closest("[data-index]")?.dataset.index;
    delete_cart(id);
    ui_update();
  }
});

document.querySelector("table").addEventListener("input", function (e) {
  let target = e.target;
  if (target.classList.contains("quantity-box")) {
    let newValue = Number(target.value);
    if (newValue < 1 || isNaN(newValue)) {
      target.value = 1;
    }

    let id = target.closest("[data-index]")?.dataset.index;
    update_cart(id, Number(target.value));

    ui_update();
  }
});

order_btn.addEventListener("click", click_add_order);
