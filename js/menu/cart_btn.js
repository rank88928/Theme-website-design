import { revise_input_num } from "../utils.js";
import { add_to_cart } from "../shopping/cart_actions.js";

document.querySelector(".card-container").addEventListener("click", function (e) {
  let target = e.target;
  let box = target.closest(".m-quantity-selector-box"); //確定點擊範圍
  if (!box) return;
  let qty_input = box.querySelector(".quantity-box");

  if (target.classList.contains("plus-btn")) {
    revise_input_num(qty_input, 1);
  } else if (target.classList.contains("reduce-btn")) {
    revise_input_num(qty_input, -1);
  } else if (target.closest(".shopping-btn")) {
    //加入購物車
    let id = target.closest(".card").dataset.index;
    let num = Number(qty_input.value);
    add_to_cart(id, num);
    qty_input.value = "0";
  }
});
