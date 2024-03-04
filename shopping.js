let data_url = 'data.json'
let data
let data_product = [];
let data_local = [];
let data_shopping;
let card;
let reduce_btn;
let plus_btn;
let quantity;


let shopping_item;





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
        product_card(index)
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
            if(quantity[index].value > 0 && quantity[index].value <=  data_product[index].quantity){
                let check = '<i class="fa-solid fa-circle-check"></i>新增成功'

                let txt = index +"號餐" + data_product[index].name + parseInt(quantity[index].value) + '份';
                status_judgment(check, txt);

                data_product[index].quantity -= parseInt(quantity[index].value);
                console.log(data_product[index].quantity+'剩');

                let empty_shopping = document.querySelector('.empty-shopping');
                empty_shopping.style.display = 'none';

               

                // 本機修改儲存
                
                data_local[index].order += parseInt(quantity[index].value);
                console.log(data_local[index].order +'本機訂購數');

                // 所有選擇歸0重置
                quantity.forEach(function(input){
                        input.value = '0';
                })

                // 購物籃畫面
                data_shopping = data_local.filter(item => item.order > 0);
                
               
                shopping_item.innerHTML = '';
                data_shopping.forEach(function(data,index){
                    if(index <= 4 ){
                        shopping_item_renew(data, index);
                        
                    }
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
        order: 0
    }
}


// 購物框更新
function shopping_item_renew(data, i){
    
    let item = document.createElement('div');
        item.className = 'item'
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
    div.append(p, order)
    item.append(div_img, div)
    shopping_item.append(item);


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
let card_container = document.querySelector('.card-container');
function product_card(i){

    let div_card = document.createElement('div');//卡片本體
        div_card.className = 'card card-detailed';

    let div_img = document.createElement('div');//圖片框
        div_img.className = 'img-control'

    let img = document.createElement('img')//圖片
        img.setAttribute('src', '/img/product/' + data_product[i].url + '.jpg');
        div_img.append(img);//組成    


    let layout_div = document.createElement('div');
        layout_div.className = 'layout-container'

    let div_txt = document.createElement('div');//文字框
        div_txt.className = 'txt-control';

    
    let h3 = document.createElement('h3');//標題
        h3.textContent = data_product[i].name;

    let p = document.createElement('p');//內文
        p.textContent = data_product[i].description;
        div_txt.append(h3, p);//組成      


    let div_card_but = document.createElement('div');
        div_card_but.className = 'action-btn';
        
    layout_div.append(div_txt, div_card_but)
    div_card.append(div_img, layout_div);//組成 
    card_container.append(div_card);//插入頁面
    
    let element;
    btn_generation("input", '-', 'reduce', "button")
        div_card_but.append(element);
    btn_generation("input", '0', 'quantity', "text")
        div_card_but.append(element);
    btn_generation("input", '+', 'plus', "button")
        div_card_but.append(element);
    btn_generation("button", ' ', 'shopping', " ")
        div_card_but.append(element);
    let btn = element
    btn_generation("i", ' ', 'fa-solid fa-cart-shopping icon', '')
        element.textContent = '加入購物車'
        btn.append(element);
        
    function btn_generation(x, y, z, k){
        element = document.createElement(x);
        element.value = y;
        element.className = z;
        element.type = k;
    }
}