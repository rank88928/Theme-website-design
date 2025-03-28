import { get_isListed_product_data } from "../api/firebase_product_api.js";
let card_content = document.querySelector(".card-container");

function select_recommendations_data(data) {
  return data.map((itme) => {
    return {
      id: itme.id,
      name: itme.name,
      img: itme.img,
      price: itme.price,
      product_text: itme.product_text,
    };
  });
}

function card_html(item) {
  return `<li class="card card-detailed" data-index='${item.id}'>
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
                <div class="m-quantity-selector-box">
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

async function menu_card() {
  let product_data = await get_isListed_product_data();
  let display_data = select_recommendations_data(product_data);

  let buffer_html = "";
  display_data.forEach((itme) => {
    buffer_html += card_html(itme);
  });
  card_content.innerHTML = buffer_html;
}

menu_card();
