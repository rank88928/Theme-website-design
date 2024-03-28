
export { check_store, data_product, data_local};

let data_product = [];
let data_local = [];

async function check_store(){
    //目標
    let data_url = 'data.json';

    //有之前的值就調用 沒有就建立空數組
    data_local = localStorage.getItem('shopping_storage') ? JSON.parse(localStorage.getItem('shopping_storage')) : [];

    try {
        const response = await fetch(data_url);
        const data = await response.json();
        data_product = data;
    } catch (error) {
        console.error('Error:', error);
    }

    if (data_local.length > 0) {
        console.log('有本地紀錄');
    } else {
        console.log('沒本地紀錄');
        data_product.forEach(function(data, index){
        data_local.push(processdata_local_shopping(data, index))
        });
    }
}
//有問題  應該改成每次都要取得最新資料  現在這樣會因為有暫存 不更新


//本機購物資料
function processdata_local_shopping(data){
    return{
        id: data.id,
        name: data.name,
        quantity: data.quantity,
        type: data.type,
        url: data.url,
        price: data.price,
        order: 0,
    }
}