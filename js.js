
try {
    //是否開啟響應式選單
    let nav_menu_but = document.querySelector(".menu-but");
    let nav_menu = document.querySelector(".nav");
    let menu_mask = document.querySelector(".menu-mask");

    nav_menu_but.addEventListener("click", function(){
        nav_menu.classList.toggle("open");
        menu_mask.classList.toggle("open");
    });
} catch (error) {
    console.error("发生错误:", error);
}

try {
    // 登入頁面開啟或關閉
    let login = document.querySelector(".login-mask");
    let loginOpen = document.querySelector(".login-open");
    let closelogin = document.querySelector(".close-login");

    loginOpen.addEventListener("click", function(){
        login.style.display ="block";
        // console.log("Login button clicked");
    });
    closelogin.addEventListener("click", function(){
        login.style.display ="none";
        // console.log("Login button clicked");
    });
} catch (error) {
    console.error("发生错误:", error);
}

try {
    // 問答框-點擊後下展示框
    let qboxes = document.querySelectorAll(".qa-Click-box");
    let aboxes = document.querySelectorAll(".qa-a");
    let arrows = document.querySelectorAll(".fa-angle-up");
    // 使用 forEach 遍歷 NodeList
    qboxes.forEach(function(qbox, index) {
        qbox.addEventListener('click', function (){
            // 藉由添加類名修改CSS狀態
            aboxes[index].classList.toggle('hidden');
            arrows[index].classList.toggle('rotate-180');
        });
    });
} catch (error) {
    console.error("发生错误:", error);
}

try {
    // 菜單切換詳細模式與簡略模式
    let detailed = document.querySelector(".detailed");//詳細
    let simple = document.querySelector(".simple");//簡略
    let mcard = document.querySelectorAll(".m-card");

    detailed.addEventListener('click', function(){
        mcard.forEach(mcard => {   //需要遍歷
            mcard.classList.add("m-card-detailed");
            mcard.classList.remove("m-card-simple");
            let p = mcard.querySelector("p");

            p.style.display = "block";
        });
    });
    simple.addEventListener('click', function(){
        mcard.forEach(mcard => {
            mcard.classList.add("m-card-simple");
            mcard.classList.remove("m-card-detailed");

            let p = mcard.querySelector("p");

            p.style.display = "none";
        });
    });
} catch (error) {
    console.error("发生错误:", error);
}

try {
    //菜單購物車數量修改按鈕
    let reducebutton = document.querySelectorAll(".reduce");
    let plusbutton = document.querySelectorAll(".plus");
    let quantity = document.querySelectorAll(".quantity");

    // 如果要操作的元件有多次重複 執行遍歷 就可以同時對所有元素掛載

    // 對於目標集合調用forEach方法
    // xxxxx.forEach(function(1, index, array ){執行函數})
    // 1=操作目標(必須參數)  
    // index=建立的索引(可選參數 由0開始第一個陣列)
    // array=

    reducebutton.forEach(function(reducebutton, index){
        reducebutton.addEventListener("click", function(){

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
    plusbutton.forEach(function(plusbutton, index){
        plusbutton.addEventListener("click", function(){

            let number = parseInt(quantity[index].value);
            quantity[index].value = number + 1;
        });
    });
} catch (error) {
    console.error("发生错误:", error);
}














