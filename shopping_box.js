
import * as request        from './data_request.js'
import * as ui_shopping from './UI_shopping.js'

export {update_cart};


let data_local = [];
let shopping_box;

(async () => {
    await request.check_store();
    data_local = request.data_local;

    shopping_box = document.querySelector('.shopping-item');

    update_cart();
})();


// 更新購物籃
function update_cart(){
    let shopping = data_local.filter(item => item.order > 0);
    shopping_box.innerHTML = '';  

    if(shopping.length == 0){
        //沒商品 當前購物車是空的
        let item =`<div class="empty-shopping">當前購物車是空的!~~~</div>`   
        shopping_box.insertAdjacentHTML('beforeend', item);
    }else{
        //有商品 最多顯示5筆
        for(let i=0; i<=4 && i<shopping.length; i++){
            ui_shopping.shopping_item_create(shopping, i);
        }
    }
   
    let remove_btn = document.querySelectorAll(".remove-shopping");//更新集合
    remove_btn.forEach(function(remove_btn, i){
        remove_btn.addEventListener("click", function(){
            remaining_updates(shopping[i].id-1);
        });
    });
}

//移除整筆
function remaining_updates(i){
    data_local[i].quantity += data_local[i].order;
    data_local[i].order = 0;
    localStorage.setItem('shopping_storage', JSON.stringify(data_local));
    update_cart();   
}
 
 