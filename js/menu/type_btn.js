import { click_type } from "./product_data.js";

let options = document.querySelector(".options-container");

options.addEventListener("click", function (e) {
  let target = e.target;
  if (target.tagName === "BUTTON") {
    let type = target.dataset.index;
    click_type(type);
  }
});
