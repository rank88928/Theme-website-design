let processed_data = [];//格式後資料
let filter_data = [];//篩選後資料

let number_data;//篩選後總筆數
let page = 1; //當前頁碼
let limit = 10;//限制顯示筆數
let all_page//總頁數
let page_data = [];//存放頁碼數組

// 頁面互動
let region_menu = document.querySelector('select')//地區
let enter = document.querySelector('.enter');
let enter_txt = enter.value;
let bnquire_but = document.querySelector('.bnquire-but');

//還要在改正的
// 選單相關沒改  選單事件委託  訊息提示框 電話號碼要去API重寫 補成市話  CSS畫面

async function get_API_data() {
    const url = 'https://api.json-generator.com/templates/53LtyOeR5OLG/data?';
    const key = 'azynp6rii8lt554x46yf6b1gz88poh508jbc7z2v';

    let get_data = await fetch(url + 'access_token=' + key);

    if (get_data.status == 401) {
        console.log(401 + '錯誤 請求失敗')  //之後補彈窗
    } else {
        get_data = await get_data.json();//格式化
    }
    processed_data = format_data(get_data);
    filter_array(0);//完成直接顯示
}

(async () => {
    await get_API_data();
})();

// 挑出特定選擇-縣市ID
function filter_array(id) {
    if (id == 0) {
        filter_data = processed_data; //全地區=原資料
    } else {
        filter_data = processed_data.filter(item => item.cityid === id);// 依地區ID挑選 
    }
    update_display()
}

// 選擇選單地區回傳id
region_menu.addEventListener('change', function () {
    let id = parseInt(region_menu.value);
    filter_array(id);
});

document.querySelector('.container').addEventListener('click', function (e) {
    if (e.target.closest('.previous_page')) {
        if (page > 1) {
            page--;
        }
        render_pagination(page);
    } else if (e.target.closest('.next_page')) {
        if (page < all_page) {
            page++;
        }
        render_pagination(page);
    }
})

enter.addEventListener('input', function () {
    enter_txt = enter.value;
})
// 查詢框資料
bnquire_but.addEventListener('click', function () {
    let k = [];
    processed_data.forEach(function (data, index) {//查每個對象
        let i = processed_data[index]; //把單個對象存起
        //for..in 用於枚舉對象的全部屬性
        for (var key in i) {
            if (i.hasOwnProperty(key)) { //如果該對象有符合的屬性回傳布林
                i[key] = String(i[key]);//把他轉換成字串
            }
        }
        var jsonString = JSON.stringify(i);
        if (jsonString.includes(enter_txt)) {
            k.push(data);
        }
    })
    filter_data = k;
    update_display()
})

function update_display() {
    let reply = document.querySelector('.reply');
    reply.textContent = number_data; //待改 *****顯示
    page = 1;//重置
    all_page = Math.ceil(filter_data.length / limit);
    render_pagination(page)
}


function render_pagination(page) {
    let page_block = 7; //限制頁碼塊總數
    let remainder = all_page - page;
    let show = page - 1;
    let index = 1;
    let middle = Math.floor(page_block / 2) + 1; //中間位

    if (all_page <= page_block) {
        // index = 1
        // show = page - 1;
    } else {
        //  後面還有頁碼數的情況
        if (page <= 4) {
            // index = 1
            // show = page - 1;
        } else
            if (page > 4) {

                index = page - 3;
                show = middle - 1;
                if (remainder < 4) {

                    index = all_page - 6
                    show = 6 - remainder;

                    if (remainder == 0) {

                        index = all_page - 6
                        show = 6
                    }
                }
            }
    }
    // console.log("頁數" + page);
    // console.log("亮" + show);
    generate_page_num(index, all_page, page_block);
    page_data[show].className = 'show';
    generate_row(page, limit);
}

//生成顯示資料
function generate_row(index, limit) {
    let html_temporary = ''
    let x = limit * (index - 1);
    let start = filter_data.slice(x, x + limit);
    //只從參照值開始擷取

    start.forEach((item) => {
        html_temporary += generating_columns(item)
    });

    function generating_columns(item) {
        let html =
            `<li class="store-data">
                <p class="id">${item.id}</p>
                <p class="name">${item.name}</p>
                <p class="area">${item.city}</p>
                <p class="location">${item.address}</p>
                <p class="contact">${item.telephone}</p>
            </li>`
        return html
    }

    let list = document.querySelector('.list'); //資料插入位
    list.innerHTML = '';
    list.insertAdjacentHTML('beforeend', html_temporary); //渲染頁面
}

// 生成頁碼數並顯示
function generate_page_num(index, all_page, page_block) {
    let page_list = document.querySelector('.page-ul');//頁碼插入位
    let html_temporary = document.createDocumentFragment();

    for (let i = 1; i <= all_page && i <= page_block; i++) {
        // 符合總頁數 且不能超出限制數
        let item = document.createElement('li');
        item.textContent = index; //頁碼序列起始數
        html_temporary.append(item);
        index++;
    }
    page_list.innerHTML = '';
    page_list.append(html_temporary);
    page_data = page_list.querySelectorAll('*');//建立頁碼數組
}

// 資料格式轉換
function format_data(data) {
    let processed_data = data.map(function (item, index) {
        return {
            id: index + 1,
            name: item.name,
            cityid: item.area,
            city: County_city(item.area),
            address: road_names(item.place) + item.lane + '弄' + item.number + '號',
            telephone: telephone_number(item.telephone),
        };
    })
    return processed_data;
}
// 縣市判斷
function County_city(area) {
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
function telephone_number(telephone) {
    return Math.ceil(telephone * 1000000000);
}
//路名判斷
function road_names(road) {
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