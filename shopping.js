
import * as request        from './data_request.js'
import * as ui from './shopping_box.js';
import * as ui_shopping from './UI_shopping.js'

let data_product = [];
let data_local = [];
let card;

(async () => {
    await request.check_store();
    data_product = request.data_product;
    data_local = request.data_local;

    data_product.forEach(function(data, index){
        ui_shopping.card_generate(data_product, index);
    });

    card = document.querySelectorAll(".card");
    btn_click()
})();


//按鈕
function btn_click(){
    let action_btn = document.querySelectorAll(".action-btn");
    action_btn.forEach(function(action_btn,i){

        let reduce_btn = action_btn.querySelector(".reduce");
        let plus_btn = action_btn.querySelector(".plus");
        let quantity = action_btn.querySelector(".quantity");
        let shopping = action_btn.querySelector('.shopping'); 
        let icon = action_btn.querySelector('.icon');
        
        action_btn.addEventListener('click', function(e){
            let number = parseInt(quantity.value); // 文本框是字串 需要先做轉型
            if(e.target === reduce_btn){
                if(number>0){
                    quantity.value = number - 1;
                }
                else{
                    quantity.value = 0;
                }

            }else if(e.target === plus_btn){
                quantity.value = number + 1;

            }else if(e.target === shopping || e.target === icon){
                if(quantity.value > 0 && quantity.value <= data_product[i].quantity){
                    data_local[i].quantity -= parseInt(quantity.value);      
                    data_local[i].order += parseInt(quantity.value);
    
                    localStorage.setItem('shopping_storage', JSON.stringify(data_local));
                        
                    let txt = i+1 +"號餐" + data_product[i].name + parseInt(quantity.value) + '份';
                    point(1, txt);
                    
                    quantity.value = '0';
                    ui.update_cart();
                }else{
                    let txt = "剩餘不足或選擇數量異常";
                    point(2, txt);

                    quantity.value = '0';
                }
            }
        });
    });
}
//用事件委派 監聽父元素


let detailed = document.querySelector(".detailed");//詳細
let simple = document.querySelector(".simple");//簡略    
    detailed.addEventListener('click', function(){
        menu_styles("detailed");
    });
    simple.addEventListener('click', function(){
        menu_styles("simple");
    });

function menu_styles(style){
    if(style == "detailed"){
        card.forEach(card => {   
            card.classList.add("card-detailed");
            card.classList.remove("card-simple");
            card.querySelector("p").style.display = "block";
        });
    }else if(style == "simple"){
        card.forEach(card => {
            card.classList.add("card-simple");
            card.classList.remove("card-detailed");
            card.querySelector("p").style.display = "none";
        });
    }
}


function point(check, txt){
    /*  狀態提示框
        check 傳入1 成功圖示 傳入2 失敗圖示
    
    */
    let box = document.querySelector('.status-box');
    let point;
    if(check == 1){
        point = '<i class="fa-solid fa-circle-check"></i>新增成功';
    }else if(check == 2){
        point = '<i class="fa-solid fa-circle-xmark"></i>新增失敗';
    }

    let item = 
        `<div class ="status">
            <div>${point}</div>
            <p>${txt}</p>
        </div>`
    box.insertAdjacentHTML('beforeend', item);
    
    setTimeout(()=>{
        let item = document.querySelector('.status');
        item.remove();
    },3000);
}




