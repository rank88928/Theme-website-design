let config = {
    data: {
        api_url: 'https://api.json-generator.com/templates/53LtyOeR5OLG/data?',
        api_key: 'azynp6rii8lt554x46yf6b1gz88poh508jbc7z2v',
        formatted_data: [],
        display_data: []
    },
    dom: {
        form_box: document.querySelector('.data-list'),
        page_block_box: document.querySelector('.page-ul'),
        btn_add_page: document.querySelector('.next-page'),
        btn_reduce_page: document.querySelector('.previous-page'),
        region_menu: document.querySelector('select'),
        data_num_txt: document.querySelector('.reply-txt'),
        paginator_btn_box: document.querySelector('.page-container'),
        query_input_box: document.querySelector('.input-box'),
        btn_query: document.querySelector('.query-btn')
    },
    paginator: {
        current_page: 1,//起始頁數 
        all_page: 0,    //全部頁數 篩選資料後得出
        page_block: 7, //顯示頁碼塊最大總數
        display_limit: 10,   //限制每次顯示筆數

        revise_page: function (num) {
            if (num < 1 || num > this.all_page) {
                return
            }
            this.current_page = num
            console.log(this.current_page)
        },

        get_all_page: function () {
            this.all_page = Math.ceil(config.data.display_data.length / this.display_limit);
        }
    },

    filter_fun: {
        //根據縣市篩選
        area: function (itme, id) {
            if (id === 0) {
                return true
            }
            return itme.cityid === id
        },
        //根據查詢框篩選
        query_input: function (item, value) {
            const lowerValue = value.toLowerCase(); //不區分大小寫

            for (let key in item) {
                let itemValue = String(item[key]).toLowerCase();
                // 轉成字串 忽略大小寫
                if (itemValue.includes(lowerValue)) {
                    return true;
                }
            }
            return false;
        },
    }
};

//差RWD
(async () => {
    let data = await fetch(config.data.api_url + 'access_token=' + config.data.api_key);

    if (data.status == 401) {
        console.log(401 + '錯誤 請求失敗')  //之後補彈窗

    } else {
        data = await data.json();
        config.data.formatted_data = format_data(data);
    }


    data_filter(config.data.formatted_data, config.filter_fun.area, 0)
})()


//篩選資料並重置配置
function data_filter(data, callback, condition) {
    config.data.display_data = data.filter(function (item) {
        return callback(item, condition)
    })
    config.paginator.get_all_page()
    config.paginator.current_page = 1
    render_data_to_page(config.data.display_data)
}


//事件
config.dom.region_menu.addEventListener('change', function () {
    data_filter(config.data.formatted_data, config.filter_fun.area, parseInt(config.dom.region_menu.value))
});

config.dom.paginator_btn_box.addEventListener('click', function (e) {
    let page = config.paginator.current_page
    let target = e.target.closest('a')
    if (target === config.dom.btn_reduce_page) {
        page--
    } else if (target === config.dom.btn_add_page) {
        page++
    }
    config.paginator.revise_page(page)
    render_data_to_page(config.data.display_data)
})
let enter_txt
config.dom.query_input_box.addEventListener('input', function () {
    enter_txt = this.value;
})

config.dom.btn_query.addEventListener('click', function () {
    data_filter(config.data.formatted_data, config.filter_fun.query_input, enter_txt)
})

//渲染資料
function render_data_to_page(data) {
    let page = config.paginator.current_page //當前頁碼
    let limit_num = config.paginator.display_limit //單次顯示筆數
    config.dom.form_box.innerHTML = '';
    // 渲染商家資料
    function render_show_html() {
        let start_index = limit_num * (page - 1);//起點索引=顯示筆數*當前頁碼-1 第1頁=0 第2頁=10
        let end_index = start_index + limit_num//結束索引=起點+顯示數
        let new_data = data.slice(start_index, end_index)

        let html_temporary = ''

        new_data.forEach((item) => {
            let html =
                `<li class="store-data">
                    <p class="id-column">
                        ${item.id}
                    </p>
                    <p class="name-column">
                        <span class='mobile-label'>店名:</span>${item.name}
                    </p>
                    <p class="area-column">
                        <span class='mobile-label'>地址:</span>${item.city}
                    </p>
                    <p class="location-column">
                        ${item.address}
                    </p>
                    <p class="contact-column">
                        <span class='mobile-label' >聯絡方式:</span>${item.telephone}
                    </p>
                </li>`
            html_temporary += html
        })
        config.dom.form_box.insertAdjacentHTML('beforeend', html_temporary)
    }
    //渲染頁碼塊
    function render_block() {
        let block_box = config.dom.page_block_box
        let block_num = 0
        let html = ''
        //頁碼塊html
        function generate_block(num) {

            for (let i = 0; i < num; i++) {
                html += `<li><a data-id=''></a></li>`
            }
            return html
        }
        block_num = config.paginator.all_page < config.paginator.page_block ? config.paginator.all_page : config.paginator.page_block
        //總頁數不足時 只產生現有塊數
        block_box.innerHTML = '';
        block_box.insertAdjacentHTML('beforeend', generate_block(block_num));
    }
    //渲染頁碼
    function render_page() {
        let all_block = config.dom.page_block_box.getElementsByTagName('a')
        let middle = Math.floor(all_block.length / 2) + 1

        function page_index(start_index) {
            Array.from(all_block).forEach(function (item, i) {

                if (item.dataset.id !== start_index + i) {
                    item.innerHTML = start_index + i
                    item.dataset.id = start_index + i
                }

                if (Number(item.dataset.id) === page) {
                    item.classList.add('show-page')
                } else {
                    item.classList.remove('show-page')
                }
            })
        }

        if (config.paginator.all_page <= all_block.length) {
            //頁碼<=上限數時 頁碼序號不變動
            page_index(1)
        } else {
            //後續還有頁碼時 

            if (page < middle + 1) {
                page_index(1) //頁碼小於時中位數不改
            } else if (config.paginator.all_page - page < middle) {
                page_index(config.paginator.all_page - 6) //剩餘頁碼小於時中位數不改 起始固定=全部-6
            } else {
                //把當前頁碼數固定於中間
                page_index(page - 3)
            }
        }
    }
    //資料數文本
    function display_txt() {
        config.dom.data_num_txt.innerHTML = `符合筆數共:${config.data.display_data.length}`
    }
    //資料異常處理
    function render_empty_state(txt) {
        let html = `<div class='abnormal-table-data'>${txt}</div>`
        config.dom.form_box.insertAdjacentHTML('beforeend', html)
    }

    if (config.data.formatted_data.length === 0) {
        let txt = '資料請求失敗'
        render_empty_state(txt)
    } else if (config.data.display_data.length === 0) {
        let txt = '未找到相關資料'
        render_empty_state(txt)
    } else {
        render_show_html()
        render_block()
        render_page()

    }
    display_txt()
}

//格式轉換
function format_data(data) {
    // 縣市判斷
    function code_get_city_name(id) {
        switch (id) {
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
        let result = Math.ceil(telephone * 1000000000);
        return result = Number(String(result).slice(0, 8));
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

    let new_data = data.map((item, index) => {
        return {
            id: index + 1, //唯一
            name: item.name,
            cityid: item.area,
            city: code_get_city_name(item.area),
            address: road_names(item.place) + item.lane + '弄' + item.number + '號',
            telephone: telephone_number(item.telephone),
        };
    })

    return new_data;
}