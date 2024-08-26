// 提示訊息模組
export { prompt_message1 }

function prompt_message1(state) {
    let box = document.querySelector('.status-box');
    let point;
    /*    
    狀態碼
    201 = 輸入數量異常
    202 = 庫存數不足
    301 = 操作成功
    302 = 移除成功
    */

    if (state.respond === 201) {
        point = '<i class="fa-solid fa-circle-xmark"></i>輸入數量異常';
    } else if (state.respond === 202) {
        point = '<i class="fa-solid fa-circle-xmark"></i>庫存數不足';
    } else if (state.respond === 301) {
        point = '<i class="fa-solid fa-circle-check"></i>新增成功';
    } else if (state.respond === 302) {
        point = '<i class="fa-solid fa-circle-check"></i>移除成功';
    } else {
        point = '<i class="fa-solid fa-circle-xmark"></i>異常錯誤';
    }


    // point = '<i class="fa-solid fa-circle-check"></i>移除成功';
    let item =
        `<div class="status">
            <div>${point}</div>
            <p>${state.txt}</p>
        </div>`;

    box.insertAdjacentHTML('beforeend', item);

    setTimeout(() => {
        let item = document.querySelector('.status');
        if (item) {
            item.remove();
        }
    }, 3000);
}