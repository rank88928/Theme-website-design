import * as shopping_renew from './shopping_updates.js';

let data_url = 'data.json'

let data_product = [];
let data_local = JSON.parse(localStorage.getItem('shopping_storage'));

let card;
let reduce_btn;
let plus_btn;
let quantity;
let shopping;



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
    data_product.forEach(function(data, index){
        shopping_renew.card_generate(data_product, index);
    });


    card = document.querySelectorAll(".card");//抓取渲染後元素
    reduce_btn = document.querySelectorAll(".reduce");
    plus_btn = document.querySelectorAll(".plus");
    quantity = document.querySelectorAll(".quantity");
    shopping = document.querySelectorAll('.shopping');
    // action_btn = document.querySelectorAll('action-btn');  
    btn_click()


})();


//掛載監聽 全部購物車功能按鈕
function btn_click(){

    reduce_btn.forEach(function(reduce_btn, index){
        reduce_btn.addEventListener("click", function(){
            let number = parseInt(quantity[index].value); // 文本框是字串 需要先做轉型
            if(number>0){
                quantity[index].value = number - 1;
            }
            else{
                quantity[index].value = 0;
            }
        });
    });
    plus_btn.forEach(function(plus_btn, index){
        plus_btn.addEventListener("click", function(){
            let number = parseInt(quantity[index].value);
            quantity[index].value = number + 1;
        });
    });//有空嘗試拆分



    // 購物車功能
    shopping.forEach(function(shopping, index){
        shopping.addEventListener('click', function(){
            //數量存數足夠且至少為1才通過
            if(quantity[index].value > 0 && quantity[index].value <= data_product[index].quantity){
                data_product[index].quantity -= parseInt(quantity[index].value);      
              
                data_local[index].order += parseInt(quantity[index].value);

                 // 本機修改儲存
                localStorage.setItem('shopping_storage', JSON.stringify(data_local));
               
         
            
                let empty_shopping = document.querySelector('.empty-shopping');
                empty_shopping.style.display = 'none';//邏輯有錯 要改 這樣取消時不會再出現 要改成判斷有無東西

                let check = '<i class="fa-solid fa-circle-check"></i>新增成功'
                let txt = index+1 +"號餐" + data_product[index].name + parseInt(quantity[index].value) + '份';
                status_judgment(check, txt);

                // 所有選擇歸0重置
                quantity.forEach(function(input){
                    input.value = '0';
                })
            }else{
                let check = '<i class="fa-solid fa-circle-xmark"></i>新增失敗';
                let txt = "剩餘不足或選擇數量異常";
                status_judgment(check, txt);
            }
        });
    });
}


// 輔助涵數

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



let detailed = document.querySelector(".detailed");//詳細
    detailed.addEventListener('click', function(){
        card.forEach(card => {   
            card.classList.add("card-detailed");
            card.classList.remove("card-simple");
            card.querySelector("p").style.display = "block";
        });
    });
let simple = document.querySelector(".simple");//簡略    
    simple.addEventListener('click', function(){
        card.forEach(card => {
            card.classList.add("card-simple");
            card.classList.remove("card-detailed");
            card.querySelector("p").style.display = "none";
        });
    });


//狀態提示框
let status_box = document.querySelector('.status-box');

function status_judgment(check, txt){
let status_item = 
    `<div class ="status">
        <div>${check}</div>
        <p>${txt}</p>
    </div>`
    status_box.insertAdjacentHTML('beforeend', status_item);
    
    setTimeout(()=>{
        let status_item = document.querySelector('.status');
        status_item.remove();
    },3000);
}




