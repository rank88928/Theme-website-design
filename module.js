document.addEventListener('DOMContentLoaded', function () {
    
    fetch("header.html")
    // 使用 Fetch API 加載外部 HTML 檔案
        .then(response => response.text())
        // 把該對象轉換為純文本
        // 注意 這裡會相關到Promise(指成功或未成功解析的暫存對象) 
        // Promise 物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });
        // 將取得的 HTML 內容插入到 id 為 "header" 的元素中

    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            // 將取得的 HTML 內容插入到 id 為 "footer" 的元素中
            document.getElementById("footer").innerHTML = data;
        });
});