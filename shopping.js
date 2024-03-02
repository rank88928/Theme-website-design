let data_url = 'data.json'
let data
let data_product = [];

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

})();

















//生成卡片組件
function product_card(i){

    let div_card = document.createElement('div');//卡片本體
        div_card.className = 'card m-card m-card-detailed';

    let div_img = document.createElement('div');//圖片框
        div_img.className = 'img-control'

    let img = document.createElement('img')//圖片
        img.setAttribute('src', '/img/product/' + data_product[i].url + '.jpg');
        div_img.append(img);//組成    

    let div_txt = document.createElement('div');//文字框
        div_txt.className = 'txt-control';

    let h3 = document.createElement('h3');//標題
        h3.textContent = data_product[i].name;

    let p = document.createElement('p');//內文
        p.textContent = data_product[i].description;
        div_txt.append(h3, p);//組成      


    let div_card_but = document.createElement('div');
        div_card_but.className = 'action-button';
        
        div_card.append(div_img, div_txt, div_card_but);//組成 
        card_container.append(div_card);//插入頁面
    
    let element;
    button_generation("input", '+', 'plus', "button")
        div_card_but.append(element);
    button_generation("input", '0', 'quantity', "text")
        div_card_but.append(element);
    button_generation("input", '-', 'reduce', "button")
        div_card_but.append(element);
    button_generation("button", ' ', 'shopping', " ")
        div_card_but.append(element);
    let but = element
    button_generation("i", ' ', 'fa-solid fa-cart-shopping icon', '')
        element.textContent = '加入購物車'
        but.append(element);
        
    function button_generation(x, y, z, k){
        element = document.createElement(x);
        element.value = y;
        element.className = z;
        element.type = k;
    }
}





let card_container = document.querySelector('.card-container');