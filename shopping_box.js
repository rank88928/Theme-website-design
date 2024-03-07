
import * as shopping_renew from './shopping_updates.js';


let data_url = 'data.json'
let data
let data_product = [];
let data_local = JSON.parse(localStorage.getItem('shopping_storage'));

let shopping_item;

async function check_store() {
    try {
        const response = await fetch(data_url);
        const data = await response.json();
        data_product = data;
        console.log("資料取得成功");
    } catch (error) {
        console.error('Error:', error);
    }

    if (data_local.length > 0) {
        console.log('有購物車紀錄');
    } else {
        console.log('沒紀錄');
        data_product.forEach(function(data, index){
        data_local.push(processdata_local_shopping(data, index))
        });
    }
}

(async () => {
    await check_store();
   
    shopping_item = document.querySelector('.shopping-item');

    update_cart();
})();


//本機購物資料
function processdata_local_shopping(data, index){
    return{
        id: data.id,
        name: data.name,
        quantity: data.quantity,
        type: data.type,
        url: data.url,
        order: 0,
        price: data.price
    }
}


let data_shopping;//選中數組
let remove_btn;
// 更新購物籃
function update_cart(){
    data_shopping = data_local.filter(item => item.order > 0);
    shopping_item.innerHTML = '';         
    data_shopping.forEach(function(data,index){
        if(index <= 4 ){
            shopping_renew.shopping_item_create(data_shopping, index) ;
        }
    })
    remove_btn = document.querySelectorAll(".remove-shopping");//更新集合
    //重新掛載監聽  按鈕索引=數組索引  取得項目唯一值
    remove_btn.forEach(function(remove_btn, index){
        let id = index;
        remove_btn.addEventListener("click", function(){
            data = data_shopping[id].id;
            remaining_updates(data);
        });
    });
}

// 取消後計算 參照唯一值
function remaining_updates(id){
    data_product[id-1].quantity += data_local[id-1].order;
    data_local[id-1].order = 0;
    localStorage.setItem('shopping_storage', JSON.stringify(data_local));
    update_cart();   // 更新購物籃
}
 
 