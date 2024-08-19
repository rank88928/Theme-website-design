// // 購物車操作
import * as shopping from "./shopping.js";
export {
    get_shopping_storage,
    shopping_update_order_quantity,
    shopping_clear_specific_order,
    reduce_quantity,
    increase_quantity,
    revise_order_quantity,
    clear_order_quantity,
    check_index
};


// // 輔助函數
// // 取得索引 檢查點擊中的元素在父元素當中有'同類名'的兄弟元素序列
function check_index(Class_name, click) {
    let elements = document.querySelectorAll(Class_name);
    return Array.from(elements).indexOf(click);
}


// 取得最新本地選購紀錄
function get_shopping_storage() {
    return JSON.parse(localStorage.getItem('shopping_storage')) || [];

}

// 商品是否存在於資料表
function database_check_product_id(id) {
    return shopping.data_product.find(function (data) {
        return id === data.id;
    });
}

// 商品是否存在選購紀錄
function shopping_record_check(data, id) {
    return data.find(function (data) {
        return id === data.id;
    });
}

// 檢查購物列表是否已有商品
function shopping_list_check(data_local, id) {
    let item = data_local.find(function (data) {
        return id === data.id;
    });

    if (!item) {
        item = database_check_product_id(id);
        if (item) {
            data_local.push(item);
        } else {
            console.log("商品id不存在");
        }
    }
    return item;
}

// 修改訂購數
function shopping_update_order_quantity(id, num) {
    let state = "未找到id";
    let data_local = get_shopping_storage();

    let item = shopping_list_check(data_local, id);

    if (item) {
        if (0 < num && num <= item.quantity) {
            item.order += num;
            item.quantity -= num;
            localStorage.setItem('shopping_storage', JSON.stringify(data_local));
            state = "修改成功";
        } else {
            state = "修改失敗";
        }
    }
    return state;
}

// 清空訂購數
function shopping_clear_specific_order(id) {
    let state = "未找到id";
    let data_local = get_shopping_storage();

    let itemIndex = data_local.findIndex(function (data) {
        return data.id === id;
    });

    if (itemIndex !== -1) {
        data_local.splice(itemIndex, 1);
        localStorage.setItem('shopping_storage', JSON.stringify(data_local));
        state = "移除成功";
    } else {
        state = "未找到id";
    }
    return state;
}

// 減少選擇數量
function reduce_quantity(quantity) {
    let number = parseInt(quantity.value);
    if (number > 0) {
        quantity.value = number - 1;
    }
}

// 增加選擇數量
function increase_quantity(quantity) {
    let number = parseInt(quantity.value);
    quantity.value = number + 1;
}

// 修改訂購數量按鈕功能
function revise_order_quantity(id, quantity, name) {
    let num = parseInt(quantity.value);
    let state;
    let txt;

    if (0 < num) {
        state = shopping_update_order_quantity(id, num);
    }
    if (state === "修改成功") {
        txt = name + num + '份';
    } else if (state === "修改失敗") {
        txt = "剩餘不足或選擇數量異常";
    }
    prompt_message(state, txt);
}

// 清除單筆訂購資料按鈕功能
function clear_order_quantity(i) {
    let state;
    let data_local = get_shopping_storage();
    let id = data_local[i].id;

    if (id) {
        state = shopping_clear_specific_order(id);
    }

    prompt_message(state);
}

// 提示訊息
function prompt_message(state, txt = "") {
    let box = document.querySelector('.status-box');
    let point;

    if (state === "修改成功") {
        point = '<i class="fa-solid fa-circle-check"></i>新增成功';
    } else if (state === "修改失敗") {
        point = '<i class="fa-solid fa-circle-xmark"></i>新增失敗';
    } else if (state === "移除成功") {
        point = '<i class="fa-solid fa-circle-check"></i>移除成功';
    } else {
        point = '<i class="fa-solid fa-circle-xmark"></i>異常錯誤';
    }

    let item =
        `<div class="status">
            <div>${point}</div>
            <p>${txt}</p>
        </div>`;
    box.insertAdjacentHTML('beforeend', item);

    setTimeout(() => {
        let item = document.querySelector('.status');
        if (item) {
            item.remove();
        }
    }, 3000);
}

