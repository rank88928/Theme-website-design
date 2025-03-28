import { get_local_shopping_records } from "./cart_records.js";
import { get_isListed_product_data } from "../api/firebase_product_api.js";
import { delete_cart } from "../shopping/cart_actions.js";

let product_data = [];

(function () {
  let shopping_box = document.querySelector(".shopping-item");

  shopping_box.addEventListener("click", function (e) {
    let target = e.target;

    if (target.classList.contains("remove-shopping")) {
      let id = target.parentElement.dataset.index;
      delete_cart(id);
    }
  });
})();

function shopping_card_html(item) {
  return `
      <div class="item" data-index="${item.id}">
          <div class="img-control">
              <img src="${item.img}"></img>
          </div>
          <div class="txt-box">
              <p class="txt-name">${item.name}</p>
              <p class="txt-qty">訂購數量:${item.order}</p>
          </div>
          <button class="remove-shopping">移除</button>
      </div>`;
}

function filling_data(shopping_data) {
  let index_data = shopping_data.map((item) => {
    return parseInt(item.id);
  });
  let hash = new Set(index_data);
  let new_data = product_data.filter((item) => hash.has(item.id));
  new_data.forEach((item, index) => {
    item.order = shopping_data[index].num;
  });
  return new_data;
}

async function update_cart_box() {
  if (product_data.length === 0) {
    product_data = await get_isListed_product_data();
  }
  let shopping_data = get_local_shopping_records("shopping_records");
  let show_data = filling_data(shopping_data);

  let shopping_box = document.querySelector(".shopping-item");
  let html = "";

  if (shopping_data.length == 0) {
    html = `<div class="empty-shopping">當前購物車是空的!~~~</div>`;
  } else {
    for (let i = 0; i < Math.min(5, show_data.length); i++) {
      html += shopping_card_html(show_data[i]);
    }
  }
  shopping_box.innerHTML = "";
  shopping_box.insertAdjacentHTML("beforeend", html);
}
update_cart_box();
export { update_cart_box };
