const apikey = 'azynp6rii8lt554x46yf6b1gz88poh508jbc7z2v';
const apiurl = 'https://api.json-generator.com/templates/53LtyOeR5OLG/data?';
let store_ask;
let store_data;//原始資料
let processed_data = [];//格式後資料
let filter_data = [];//篩選後資料

let list = document.querySelector('.list'); //資料
let temporary_list = document.createDocumentFragment();//列表暫存
let page_list = document.querySelector('.page-ul');//頁碼
let temporary_page = document.createDocumentFragment();//頁碼列表暫存

let region_menu = document.querySelector('select')//地區

let number_data;//篩選後總筆數
let display_number = 10;//單頁列出筆數

let page = 1; //當前頁碼
let total = 0 //總頁碼
let page_data = [];
let page_left_but = document.querySelector('.left');
let page_right_but = document.querySelector('.right');

let pac = document.querySelector('.pac');


// 取得API資料
async function check_store(){
    store_ask = await fetch(apiurl + 'access_token=' + apikey);
    if(store_ask.status == 401){
        console.log(401+'錯誤 請求失敗');
    }else{
        store_data = await store_ask.json();
    }
}

// 挑出特定選擇
async function filter_array(id){
    await check_store();
    if(id == 0){
        filter_data = processed_data; //全地區=原資料
    }else{
        filter_data = processed_data.filter(item => item.cityid === id);// 依地區ID挑選 
    }
    number_data = filter_data.length;//回傳筆總數
    pac.textContent = number_data; 
    display_quantity(1);
    generate_page(number_data);//建立頁碼
    page_data = page_list.querySelectorAll('*');
    page_data[0].className = 'show';
   
}


//生成顯示資料
function display_quantity(i){
    let x = display_number * (i - 1);
    let start = filter_data.slice(x);
    console.log(x + '索引');
    start.forEach((item, index) => {
    if (index < display_number) {
        generate(item.id, item.mane, item.city, item.address, item.telephone);
    }
});
    list.innerHTML = '';
    list.append(temporary_list);
    // 建立列表
}

//索引的問題 按鈕下去會導致時濟到第3 按2 才會顯示1

// 回調等待
(async () => {
    await check_store();
    store_data.forEach(function(data, index) {
        let item = processdata(data, index)// 資料轉換
        processed_data.push(item); // 新資料
    });

    processed_data.forEach((item, index) => {
        if (index < 10) {
            generate(item.id, item.mane, item.city, item.address, item.telephone);
        }
        list.append(temporary_list);
    });
    // 初始有新資料就更新

// 自執行涵數待查 為什麼需要等待 而另一個練習api不用
})();








// 修改選單時更新
region_menu.addEventListener('change', function(){
    let value = region_menu.value;
    let id = parseInt(value);
    filter_array(id);
    page = 1;
    });
page_left_but.addEventListener('click', function(){
    if( 0 < page  ){
        page -= 1;
    }
    display_quantity(page)
    console.log(page-1 +'頁數');

    page_data[page -1].className = 'show';
    page_data[page + 1].classList.remove('show');
})
page_right_but.addEventListener('click', function(){
    if( page < total ){
        page += 1;
    }
    display_quantity(page)
    console.log(page-1 +'頁數');

    page_data[page -1].className = 'show';
    page_data[page - 1].classList.remove('show');
})


// 生成表單結構 吐出一個資料列
function generate(id, mane, city, address, telephone){
    let li = document.createElement('li');
    li.className = 'store-data';

    function list_1(k, classmane){
        let i = document.createElement('p');
        i.className = classmane;
        i.textContent = k;
        return i;
    }
    // 把創建元素的辦法用函數處理起來 給一個K 吐出p元素 帶有k值的CSS 文字
    li.append(list_1(id,'id'),
              list_1(mane,'mane'),
              list_1(city,'area'),
              list_1(address,'location'),
              list_1(telephone,'contact'),);
    temporary_list.append(li);
}




// 渲染頁碼
function generate_page(){
    z = Math.ceil(number_data / display_number);
    total = z;
    for(i=1; i <= z && i < 8; i++){
    let x = document.createElement('li');
    x.textContent = i;
    temporary_page.append(x);
    }
    page_list.innerHTML = '';
    page_list.append(temporary_page);
}

// 資料格式轉換
function processdata(data, index){
    return {
        id: index + 1,
        mane: data.mane,
        cityid: data.area,
        city: County_city(data.area),
        address:  road_names(data.place) + data.lane +'弄' + data.number + '號',
        telephone: telephone_number(data.telephone),
    };
    // 注意數組 函數處理 要有回傳值才能讀出來
}

// 縣市判斷
function County_city(area){
    switch (area) {
        case 1:
            return "台北市";
            break;
        case 2:
            return "新北市";
            break;
        case 3:
            return "桃園市";
            break;
        case 4:
            return "台中市";
            break;
        case 5:
            return "台南市";
            break;
        case 6:
            return "高雄市";
            break;
        case 7:
            return "基隆市";
            break;
        case 8:
            return "新竹市";
            break;
        case 9:
            return "嘉義市";
            break;
        case 10:
            return "新竹縣";
            break;
        case 11:
            return "苗栗縣";
            break;
        case 12:
            return "彰化縣";
            break;
        case 13:
            return "南投縣";
            break;
        case 14:
            return "雲林縣";
            break;
        case 15:
            return "嘉義縣";
            break;
        case 16:
            return "屏東縣";
            break;
        case 17:
            return "宜蘭縣";
            break;
        case 18:
            return "花蓮縣";
            break;
        case 19:
            return "台東縣";
            break;
        case 20:
            return "澎湖縣";
            break;
        case 21:
            return "金門縣";
            break;
        case 22:
            return "連江縣";
            break;
        default:
            return "未知";
            break;
    }
}
// 電話
function telephone_number(telephone){
    return Math.ceil(telephone * 1000000000);
}
//路名判斷
function road_names(road){
    switch (road) {
        case 1:
            return "民生路";
            break;
        case 2:
            return "吳鳳路";
            break;
        case 3:
            return "中正路";
            break;
        case 4:
            return "福德路";
            break;
        case 5:
            return "健康路";
            break;
        case 6:
            return "興業路";
            break;
        case 7:
            return "中興路";
            break;
        case 8:
            return "西屯路";
            break;
        case 9:
            return "健行路";
            break;
        case 10:
            return "漢口路";
            break;
        default:
            return "未知";
            break;
    }
}

