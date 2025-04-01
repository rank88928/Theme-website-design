import { get_isListed_product_data } from "../api/firebase_product_api.js";
import "../shopping/cart_box.js";
let card_content = document.querySelector(".card-container");
let product_data;
let display_data = [];
let current_type = "全部";
let card_config = {
  mode: "detailed",
};
function select_recommendations_data(data) {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      img: item.img,
      price: item.price,
      product_text: item.product_text,
    };
  });
}

function card_html(item) {
  return `<li class="card card-${card_config.mode}" data-index='${item.id}'>
        <div class="img-box">
           <img src="${item.img}">
        </div>

        <div class="txt-box">
            <h3>${item.name}</h3>
            <p>${item.product_text}</p>

            <div class="price-box">
                <div class="price">
                    售價:${item.price}元
                </div>
                <div class="m-quantity-selector-box" data-index="${item.id}">
                    <input class="reduce-btn" type="button" value="-">
                    <input class="quantity-box" type="text" value="0">
                    <input class="plus-btn" type="button" value="+">
                    <button class="shopping-btn">
                        <i class="fa-solid fa-cart-shopping icon">加入購物車</i>
                    </button>
                </div>
            </div>
        </div>
    </li> `;
}

function ui_update() {
  let buffer_html = "";
  display_data.forEach((item) => {
    buffer_html += card_html(item);
  });
  card_content.innerHTML = buffer_html;
}

async function menu_card() {
  let all_product_data = await get_isListed_product_data();
  product_data = all_product_data; //邏輯重複 有空簡化
  //資料已改成統一取得
  display_data = select_recommendations_data(all_product_data);

  ui_update();
}
menu_card();

function click_type(key) {
  if (product_data.length === 0) {
    return;
  }
  if (current_type === key) {
    return;
  }

  if (key === "全部") {
    display_data = product_data;
  } else {
    display_data = product_data.filter((item) => {
      return item.type === key;
    });
  }

  current_type = key;
  ui_update();
}
export { click_type, card_config };
