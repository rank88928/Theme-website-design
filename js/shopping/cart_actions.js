import { get_local_shopping_records, store_local_shopping_records } from "./cart_records.js";
import { get_isListed_product_data } from "../api/firebase_product_api.js";
import { update_cart_box } from "../shopping/cart_box.js";
import { message } from "../module/cart_message.js";

let all_product_data = await get_isListed_product_data();

function add_to_cart(id, num) {
  let shopping_data = get_local_shopping_records("shopping_records");
  let product = { id, num };
  let obj = shopping_data.find((item) => {
    return item.id === product.id;
  });

  if (obj) {
    obj.num += product.num;
  } else {
    shopping_data.push(product);
  }

  store_local_shopping_records("shopping_records", shopping_data);
  update_cart_box();

  message.success("新增 " + get_name(id) + num + "份 成功");
}

function delete_cart(id) {
  let shopping_data = get_local_shopping_records("shopping_records");
  let index = shopping_data.findIndex((item) => {
    return item.id === id;
  });

  if (index == -1) {
    return;
  }
  shopping_data.splice(index, 1);
  store_local_shopping_records("shopping_records", shopping_data);
  update_cart_box();
  message.success("刪除 " + get_name(id) + " 成功");
}

function get_name(id) {
  console.log(all_product_data);
  let item = all_product_data.find((item) => {
    return item.id === Number(id);
  });
  if (item === false) {
    return "";
  }
  return item.name;
}

export { add_to_cart, delete_cart };
