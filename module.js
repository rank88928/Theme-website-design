document.addEventListener('DOMContentLoaded', function () {
        // 操作目標
    fetch("share.html")
        // 載入的檔案
        .then(response => response.text())
        // 把該對象轉換為純文本
        // 注意 這裡會相關到Promise(指成功或未成功解析的暫存對象) 
        // Promise 物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。

        .then(data => {
            // 創建一個虛擬的 HTML 文檔
            const virtualDocument = new DOMParser().parseFromString(data, 'text/html');

            // 使用 importNode 方法將 header 和 footer 的父元素引入到當前文檔
            const Header = document.importNode(virtualDocument.getElementById("header"), true);
            const Footer = document.importNode(virtualDocument.getElementById("footer"), true);

            // 將引入的元素插入到目標元素中
            const top = document.getElementById("header");
            top.appendChild(Header);
            const bot = document.getElementById("footer");
            bot.appendChild(Footer);
        });
});
