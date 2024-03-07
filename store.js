let processed_data = [];//格式後資料
let filter_data = [];//篩選後資料
let list = document.querySelector('.list'); //資料
let page_list = document.querySelector('.page-ul');//頁碼

let number_data;//篩選後總筆數
let display_number = 10;//單頁列出筆數
const display_page = 7; //頁碼顯示上限
let page = 1; //當前頁碼
let total = 0 //總頁碼
let page_data = [];
let page_color = 0; //顯示當頁

// 頁面互動
let region_menu = document.querySelector('select')//地區
let page_left_but = document.querySelector('.previous_page');
let page_right_but = document.querySelector('.next_page');
let enter = document.querySelector('.enter');
let enter_txt = enter.value;
let bnquire_but = document.querySelector('.bnquire-but');


// 取得API資料
async function check_store(){
    const apikey = 'azynp6rii8lt554x46yf6b1gz88poh508jbc7z2v';
    const apiurl = 'https://api.json-generator.com/templates/53LtyOeR5OLG/data?';
    let store_ask;
    let store_data;//原始資料
    store_ask = await fetch(apiurl + 'access_token=' + apikey);
    if(store_ask.status == 401){
        console.log(401+'錯誤 請求失敗');    //這裡補一個彈出
    }else{
        store_data = await store_ask.json();
    }
    store_data.forEach(function(data, index) {
        processed_data.push(processdata(data, index)); 
    });// 把原始資料處理過後 放置到新數組
    filter_array(0);// 資料準備完成直接顯示
}
(async () => {
    await check_store();
})();//頁面開始 直接呼叫資料


// 挑出特定選擇-縣市ID
function filter_array(id){
    if(id == 0){
        filter_data = processed_data; //全地區=原資料
    }else{
        filter_data = processed_data.filter(item => item.cityid === id);// 依地區ID挑選 
    }
    page_update()//呼叫畫面更新
}




//---------------頁面互動功能------------

// 選擇選單地區回傳id
region_menu.addEventListener('change', function(){
    let id = parseInt(region_menu.value);
    filter_array(id);
    });


// 前一頁
page_left_but.addEventListener('click', function(){
    page_color_removal();  //移除頁碼標記
    if(page > 1) page--;   //頁碼修改
    display_quantity(page) //輸出新畫面

//向左-碰到底不更新頁碼區  
    let x =page_data.length -1;
    if(page > x && page !=1){
        k = page - 6;
        generate_page(k)
        page_data[x].className = 'show';
    }else{
        if(page_color > 0 ){
            page_color --;
            page_data[page_color].className = 'show';
        }else{
            page_data[page_color].className = 'show';
        }
    }
})

// 後一頁
page_right_but.addEventListener('click', function(){
    page_color_removal(); 
    if(page < total) page++; 
    display_quantity(page) 

    let x =page_data.length -1;
    if(page_color < page_data.length -1 ){
        page_color ++;
        console.log(page_color)
        page_data[page_color].className = 'show';
    }else{
        page_data[x].className = 'show';
    }
    if(page > x + 1){
        k = page - 6;
        generate_page(k)
        page_data[x].className = 'show';
    }
})
//有空在嘗試別種方式  讓頁碼居中  頁碼取餘數+商=中位數
//按鈕要改成可以按



enter.addEventListener('input', function(){
    enter_txt = enter.value;
})
// 查詢框資料
bnquire_but.addEventListener('click', function(){
    let k = [];
    processed_data.forEach(function(data, index){//查每個對象
        let i = processed_data[index]; //把單個對象存起
        //for..in 用於枚舉對象的全部屬性
        for(var key in i ){
            if (i.hasOwnProperty(key)){ //如果該對象有符合的屬性回傳布林
                i[key] = String(i[key]);//把他轉換成字串
            }
        }
        var jsonString = JSON.stringify(i);
        if(jsonString.includes(enter_txt)){
            k.push(data);
        }
    })
    filter_data = k;
    page_update()
})



// 輔助涵數

// 畫面更新--------------------------------------------
function page_update(){

    number_data = filter_data.length;//回傳當次總筆數
    let reply = document.querySelector('.reply');
    reply.textContent = number_data; //待改 *****顯示
    // 重置判斷條件
    page_color = 0;
    page = 1;
    //更新
    display_quantity(1);//資料欄
    generate_page(1);//頁碼
    page_data[page_color].className = 'show';
}

//生成顯示資料
function display_quantity(i){
    let temporary_list = document.createDocumentFragment();//列表暫存
    let x = display_number * (i - 1); //預設10筆 *傳入頁碼=參照起始索引
    let start = filter_data.slice(x); //建立一個數組副本 只從參照值開始擷取

    start.forEach((item, index) => {  
        if (index < display_number) {
            generate(item);
        }
    });
    // 生成表單結構資料列
    function generate(item){
        let li = document.createElement('li');
        li.className = 'store-data';

        function list_1(k, item){
            let i = document.createElement('p');
            i.className = item;
            i.textContent = k;
            return i;
        }
        // 把創建元素的辦法用函數處理起來 直接生成一組
        li.append(list_1(item.id,'id'),
                list_1(item.name,'name'),
                list_1(item.city,'area'),
                list_1(item.address,'location'),
                list_1(item.telephone,'contact'),);
        temporary_list.append(li);
    }
    list.innerHTML = '';
    list.append(temporary_list); //渲染頁面
}


//移除頁碼標記
function page_color_removal(){
    page_data.forEach(function(page_data){
        page_data.className = ' ';
    });
}

// 生成頁碼數並顯示
function generate_page(start){
    let temporary_page = document.createDocumentFragment();//暫存
    let k = Math.ceil(number_data / display_number);//總頁碼
    total = k;
    for(let i=1; i <= k && i <= display_page ; i++){   //小於等於頁碼總數且小於頁碼顯示數
    let x = document.createElement('li');
    x.textContent = start; //起始點
    temporary_page.append(x);
    start++;
    }
    page_list.innerHTML = '';
    page_list.append(temporary_page);
    page_data = page_list.querySelectorAll('*');
}



// 資料格式轉換---------------------------------------
function processdata(data, index){
    return {
        id: index + 1,
        name: data.name,
        cityid: data.area,
        city: County_city(data.area),
        address:  road_names(data.place) + data.lane +'弄' + data.number + '號',
        telephone: telephone_number(data.telephone),
    };
}
// 縣市判斷
function County_city(area){
    switch (area) {
        case 1:
            return "台北市";  
        case 2:
            return "新北市";  
        case 3:
            return "桃園市";    
        case 4:
            return "台中市";
        case 5:
            return "台南市";
        case 6:
            return "高雄市";
        case 7:
            return "基隆市";
        case 8:
            return "新竹市";  
        case 9:
            return "嘉義市";   
        case 10:
            return "新竹縣";  
        case 11:
            return "苗栗縣";  
        case 12:
            return "彰化縣";  
        case 13:
            return "南投縣";  
        case 14:
            return "雲林縣"; 
        case 15:
            return "嘉義縣";
        case 16:
            return "屏東縣";
        case 17:
            return "宜蘭縣";    
        case 18:
            return "花蓮縣"; 
        case 19:
            return "台東縣";
        case 20:
            return "澎湖縣";
        case 21:
            return "金門縣";  
        case 22:
            return "連江縣";
        default:
            return "未知";
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
        case 2:
            return "吳鳳路";
        case 3:
            return "中正路";
        case 4:
            return "福德路";
        case 5:
            return "健康路";
        case 6:
            return "興業路";
        case 7:
            return "中興路";
        case 8:
            return "西屯路";
        case 9:
            return "健行路";
        case 10:
            return "漢口路";
        default:
            return "未知";
    }
}

