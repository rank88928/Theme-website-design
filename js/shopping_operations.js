// // 購物車操作
import * as utils from "./utils.js"
import * as get_data from "./get_data.js";
import * as m_prompt_message from "./m_prompt_message.js"
export {
    check_index,
    Product_object_fun,
    execute_add_to_cart,
    execute_remove_to_cart,
    execute_modify_to_cart
};


// // 輔助函數
// // 取得索引 檢查點擊中的元素在父元素當中有'同類名'的兄弟元素序列
function check_index(Class_name, click) {
    let elements = document.querySelectorAll(Class_name);
    return Array.from(elements).indexOf(click);
}

let shopping_records = utils.get_local_records('shopping_records');
// btn功能
//商品添加
function execute_add_to_cart(id, num) {

    let product = id_find_product_object(id)//取得指定商品指向
    let state = product.add_to_cart(num);
    utils.store_local_records('shopping_records', shopping_records)
    m_prompt_message.prompt_message1(state);
}
//商品清除
function execute_remove_to_cart(id) {

    let product = id_find_product_object(id)
    let state = product.remove_to_cart();
    m_prompt_message.prompt_message1(state);

    let remove = remove_specified_products(id)
    // console.log(remove)

    utils.store_local_records('shopping_records', shopping_records)
}

//修改數量
function execute_modify_to_cart(id, num) {

    let product = id_find_product_object(id)//取得指定商品指向
    let state = product.modify_quantity(num);
    utils.store_local_records('shopping_records', shopping_records)
    m_prompt_message.prompt_message1(state);
}




let data_url = './data/product_data-11.json';
let data = await get_data.fetch_data(data_url);
//用id在購物紀錄尋找商品對象
function id_find_product_object(id) {

    shopping_records = utils.get_local_records('shopping_records')
    //先在購物紀錄找
    let obj = shopping_records.find(function (item) {
        return item.id === id;
    });

    if (obj) {
        Product_object_fun(obj)//重新掛載方法
        return obj

    } else {

        //購物紀錄不存在 在找全商品內找並新增
        obj = data.find(function (item) {
            return item.id === id;
        });
        if (obj) {

            let copy = structuredClone(obj);
            shopping_records.push(copy);//新增至購物紀錄
            Product_object_fun(copy)
            return copy
        } else {
            console.log('沒有該項商品編號')
        }
    }
}

//移除指定商品
function remove_specified_products(id) {
    shopping_records = utils.get_local_records('shopping_records')

    let index = shopping_records.findIndex(function (item) {
        return item.id === id;
    });
    return shopping_records.splice(index, 1)
}


function Product_object_fun(item) {

    item.state = {
        respond: 0,
        txt: ""
    }

    //輸入數量檢查
    item.examine_quantity = function (num) {
        // 數量為0或小於零為異常
        if (num <= 0) {
            this.state.respond = 201;
            this.state.txt = "數量不合法!";
            return false
        }
        return true
    }
    //庫存檢查
    item.examine_stock = function (num) {
        // 不能大於庫存+已確認數量  
        if (num > this.stock + this.order) {
            this.state.respond = 202;
            this.state.txt = "庫存不足";
            return false
        }
        return true
    }

    //新增訂購
    item.add_to_cart = function (num) {

        if (this.examine_quantity(num) && this.examine_stock(num)) {

            this.stock -= num;
            this.order += num;
            this.state.txt = this.name + num + "份已加入購物車~";
            this.state.respond = 301;
        }
        return this.state
    };

    //全部清除
    item.remove_to_cart = function () {
        this.stock += this.order;
        this.order = 0;
        this.state.respond = 302;
        this.state.txt = "清除成功" + "該商品" + this.name + "已移除";
        return this.state
    }

    // 修改數量
    item.modify_quantity = function (num) {

        if (this.examine_quantity(num) && this.examine_stock(num)) {

            this.stock += this.order - num;
            this.order = num;
            this.state.txt = this.name + "已成功修改~";
            this.state.respond = 301;
        }
        return this.state
    }


    //訂單總價格
    item.price_calculation = function () {
        let total = this.order * this.price;
        console.log("當前訂單總價" + total);
        return total
    }

    return item;
}


