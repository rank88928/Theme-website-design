let data_url = 'data.json'
let data
let data_product = [];
let data_local = [];//本機儲存
let data_shopping;
let card;
let reduce_btn;
let plus_btn;
let quantity;


let shopping_item;

let remove_btn;



async function check_store() {
    try {
        const response = await fetch(data_url);
        const data = await response.json();
        data_product = data;
        console.log("取得成功");
    } catch (error) {
        console.error('Error:', error);
    }
}



(async () => {
    await check_store();


    data_product.forEach(function(data, index){
        // product_card(index);
        card_generate(index);
    });



    card = document.querySelectorAll(".card");//抓取渲染後元素

    reduce_btn = document.querySelectorAll(".reduce");
    plus_btn = document.querySelectorAll(".plus");
    quantity = document.querySelectorAll(".quantity");
    shopping = document.querySelectorAll('.shopping');
    action_btn = document.querySelectorAll('action-btn');  
    btn_click()



    shopping_item = document.querySelector('.shopping-item');

    data_product.forEach(function(data, index){
        data_local.push(processdata_local_shopping(data, index))
        //之後要判斷本機資料有沒有 才拿取
    });


})();










//掛載監聽 全部購物車功能按鈕
function btn_click(){
        
    reduce_btn.forEach(function(reduce_btn, index){
        reduce_btn.addEventListener("click", function(){

            let number = parseInt(quantity[index].value);
            // 文本框是字串 需要先做轉型
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
               
                console.log(data_product[index].quantity+'原本');
               
                data_product[index].quantity -= parseInt(quantity[index].value);
                
                console.log(data_product[index].quantity+'剩');

                
                // 本機修改儲存
                data_local[index].order += parseInt(quantity[index].value);
                console.log(data_local[index].order +'訂購數');

                

                // 購物籃畫面
                data_shopping = data_local.filter(item => item.order > 0);
                
                shopping_item.innerHTML = '';
                data_shopping.forEach(function(data,index){
                    if(index <= 4 ){
                        shopping_item_renew(data, index);
                    }
                })


                remove_btn = document.querySelectorAll(".remove-shopping");//更新集合
                remove_click();



               
            
                let empty_shopping = document.querySelector('.empty-shopping');
                empty_shopping.style.display = 'none';//邏輯有錯 要改 這樣取消時不會再出現 要改成判斷有無東西

                let check = '<i class="fa-solid fa-circle-check"></i>新增成功'
                let txt = index +"號餐" + data_product[index].name + parseInt(quantity[index].value) + '份';
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

// console.log(data_shopping)







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


// 購物框更新
function shopping_item_renew(data, i){
    
    let item = document.createElement('div');
        item.className = 'item '
    let div_img = document.createElement('div');//圖片框
        div_img.className = 'img-control'

    let img = document.createElement('img')//圖片
        img.setAttribute('src', '/img/product/' + data_shopping[i].url + '.jpg');
        div_img.append(img);//組成    
    

    let div = document.createElement('div');
        div.className = 'txt-box'

    let p = document.createElement('p');//標題
        p.className = 'txt-name'
        p.textContent = data_shopping[i].name;

    let order = document.createElement('p');//購買數
        order.className = 'txt-qty'
        order.textContent = '數量:' + data_shopping[i].order;


    let btn =  document.createElement('button');
        btn.className = 'remove-shopping';
        btn.textContent = '移除';

    div.append(p, order);
    item.append(div_img, div, btn);
    shopping_item.append(item);
}




//第二個移除有問題 因為沒有在呼叫
function remove_click(){
    
    remove_btn.forEach(function(remove_btn, index){
        let id = index;
        remove_btn.addEventListener("click", function(){
            data = data_shopping[id].id;

            console.log(data);
            
            remaining_updates(data);
            
        });
    })
}

function remaining_updates(id){
    console.log(id +'商品id'+data_product[id-1].name);
    console.log(data_product[id-1].quantity+'原剩餘數');
    console.log(data_local[id-1].order +'取消購買數');
    
    data_product[id-1].quantity += data_local[id-1].order;
                data_local[id-1].order = 0;

    console.log(data_product[id-1].quantity+'新剩餘');
    console.log(data_local[id-1].order+'當前訂購');


    data_shopping = data_local.filter(item => item.order > 0);
                
                shopping_item.innerHTML = '';
                data_shopping.forEach(function(data,index){
                    if(index <= 4 ){
                        shopping_item_renew(data, index);
                    }
                    
                })

                remove_btn = document.querySelectorAll(".remove-shopping");//更新集合
                remove_click();

}
 









//狀態提示框
let status_box = document.querySelector('.status-box')
function status_judgment(check, txt){
    let status_item = document.createElement('div');
    status_item.className = 'status'
    status_box.append(status_item);

    let status = document.createElement('div')
    status.innerHTML = check;

    let p = document.createElement('p')
    p.innerHTML = txt;
    
    status_item.append(status, p);

    setTimeout(()=>{
        status_item.remove();
    },3000);
}


let detailed = document.querySelector(".detailed");//詳細
let simple = document.querySelector(".simple");//簡略
    // 菜單切換詳細模式與簡略模式
    detailed.addEventListener('click', function(){
        card.forEach(card => {   //需要遍歷
            card.classList.add("card-detailed");
            card.classList.remove("card-simple");
            card.querySelector("p").style.display = "block";
        });
    });
    simple.addEventListener('click', function(){
        card.forEach(card => {
            card.classList.add("card-simple");
            card.classList.remove("card-detailed");
            card.querySelector("p").style.display = "none";
        });
    });


//卡片

function card_generate(i){
let h =
    `<div class="card card-detailed">
        <div class="img-control">
            <img src="/img/product/${data_product[i].url}.jpg">
        </div>
        <div class="illustrate-container">
            <div class="txt-control">
                <h3>${data_product[i].name}</h3>
                <p>${data_product[i].description}</p>
            </div>
            <div class="price-btn">
                <div class="price">
                    售價:${data_product[i].price}
                </div>
                <div class="action-btn">
                    <input class="reduce" type="button" value="-">
                    <input class="quantity" type="text">
                    <input class="plus" type="button" value="+">
                    <button value=" " class="shopping" type=" ">
                        <i class="fa-solid fa-cart-shopping icon">加入購物車</i>
                    </button>
                </div>
            </div>
        </div>
    </div> `;
    card_container.insertAdjacentHTML('beforeend', h);
}   









let card_container = document.querySelector('.card-container');
function product_card(i){

    let div_card = document.createElement('div');//卡片本體
        div_card.className = 'card card-detailed';

    let div_img = document.createElement('div');//圖片框
        div_img.className = 'img-control'

    let img = document.createElement('img')
        img.setAttribute('src', '/img/product/' + data_product[i].url + '.jpg');
        div_img.append(img);

    let div = document.createElement('div');//文字框
        div.className = 'illustrate-container'

    let div_txt = document.createElement('div');
        div_txt.className = 'txt-control';

    let h3 = document.createElement('h3');
        h3.textContent = data_product[i].name;

    let p = document.createElement('p');
        p.textContent = data_product[i].description;
        div_txt.append(h3, p);

    let div_2 = document.createElement('div');//價格按鈕
        div_2.className = 'price-btn'

    let price = document.createElement('div');
        price.className ='price';
        price.textContent = '售價:' + data_product[i].price;

    let but = document.createElement('div');
        but.className = 'action-btn';
        
    div_2.append(price, but)
    div.append(div_txt, div_2)
    div_card.append(div_img, div);
    card_container.append(div_card);//插入頁面
    

    let element;
    btn_generation("input", '-', 'reduce', "button")
        but.append(element);
    btn_generation("input", '0', 'quantity', "text")
        but.append(element);
    btn_generation("input", '+', 'plus', "button")
        but.append(element);
    btn_generation("button", ' ', 'shopping', " ")
        but.append(element);
    let btn1 = element
    btn_generation("i", ' ', 'fa-solid fa-cart-shopping icon', '')
        element.textContent = '加入購物車'
        btn1.append(element);
        
    function btn_generation(x, y, z, k){
        element = document.createElement(x);
        element.value = y;
        element.className = z;
        element.type = k;
    }
}