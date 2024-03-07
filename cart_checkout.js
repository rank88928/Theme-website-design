
let data_local = JSON.parse(localStorage.getItem('shopping_storage'));
//這裡之後要做判斷  沒資料=當前購物車是空的




let order_data = document.querySelector('.order-data');
let price_container = document.querySelector('.calculate-price-container');

let data_url = 'data.json';

let reduce_btn;
let plus_btn;
let quantity;


let revise_btn;

//這裡之後改直接讀瀏覽器儲存 

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
   
    update_item();
    update_calculate_price();

    

    reduce_btn = document.querySelectorAll(".reduce");
    plus_btn = document.querySelectorAll(".plus");
    quantity = document.querySelectorAll(".quantity");
    shopping = document.querySelectorAll('.shopping');


    btn_click();
    revise_btn = document.querySelectorAll(".revise");
    console.log(revise_btn);



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





//移除  cancel



revise_btn = document.querySelectorAll(".revise");//更新集合

//重新修改
//按鈕索引比對選購數組索引  取得商品對應序號 按序號修改


revise_btn.forEach(function(revise_btn, i){
    revise_btn.addEventListener("click", function(){
        id = data_shopping[i].id;
        update_purchase_count(id, i);
    });
});

}

//i是選取索引
function update_purchase_count(id, i){

    
    console.log(data_local[id-1].order +'購買數')
    data_product[id-1].quantity += data_local[id-1].order;

    console.log(data_product[id-1].quantity +'原始數')
    
  
    data_local[id-1].order = parseInt(quantity[i].value);

    console.log(quantity[i].value +'框框數')
  
    if(quantity[i].value > 0 && quantity[i].value <= data_product[id-1].quantity){
        data_product[id-1].quantity -= parseInt(quantity[i].value);      
        
        console.log(data_product[id-1].quantity +'購買後剩餘')
        
        data_local[id-1].order += parseInt(quantity[i].value);

        console.log( data_local[id-1].order+'購買量')


         // 本機修改儲存
        localStorage.setItem('shopping_storage', JSON.stringify(data_local));
       

        console.log('成功');
        // let check = '<i class="fa-solid fa-circle-check"></i>新增成功'
        // let txt = index+1 +"號餐" + data_product[index].name + parseInt(quantity[index].value) + '份';
        // status_judgment(check, txt);

        // 所有選擇歸0重置
        // quantity.forEach(function(input){
        //     input.value = '0';
        update_item();
        update_calculate_price();

    }else{
        console.log('異常');
        // let check = '<i class="fa-solid fa-circle-xmark"></i>新增失敗';
        // let txt = "剩餘不足或選擇數量異常";
        // status_judgment(check, txt);
    };
};
















function update_item(){
    data_shopping = data_local.filter(item => item.order > 0);
    order_data.innerHTML = '';         
    data_shopping.forEach(function(data,index){
        shopping_list(data, index);
    })
}

function update_calculate_price(){
    let sum = 0
    data_shopping = data_local.filter(item => item.order > 0);
    price_container.innerHTML = '';
    data_shopping.forEach(function(data,i){
        sum += (data_shopping[i].order * data_shopping[i].price);
        calculate_price(data, i);
    })

    let item = `<div class="sum">合計:${sum}元</div>`
    price_container.insertAdjacentHTML('beforeend', item);  
}










function shopping_list(data, i){
    let item =

        `<div class="list">
            <div class="container">
                <div class="txt">  
                    <div class="name">
                        商品:${data_shopping[i].name}
                    </div>
                    <div class="qty">
                        數量:${data_shopping[i].order}
                    </div>
                    <div class="price">
                        單價:${data_shopping[i].price}
                    </div>
                </div> 
                <div class="control-flex">   
                    <div class="img-control">
                        <img src="/img/product/${data_shopping[i].url}.jpg">
                    </div>
                    
                    <div> 
                        <div class="btn-container">
                            <input class="reduce" type="button" value="-">
                            <input class="quantity" type="text" value="${data_shopping[i].order}">
                            <input class="plus" type="button" value="+">
                            <button class="revise">
                                確定修改
                            </button>
                        </div>
                    </div>
                    
                </div> 
            </div> 
            <div class="cancel">
                <button value=" " class="cancel-btn" type=" ">
                    <i class="fa-solid fa-rectangle-xmark">整筆移除</i>
                </button>
            </div>
        </div>`;

    order_data.insertAdjacentHTML('beforeend', item);    
};



function calculate_price(data, i){

    let item =
        `<div class="price-container">
            <div class="price-name">
                ${data_shopping[i].name}
            </div>
            <div class="price">
               共${data_shopping[i].order * data_shopping[i].price}元
            </div>
        </div>`;

    price_container.insertAdjacentHTML('beforeend', item);  
};

