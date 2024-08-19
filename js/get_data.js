export { get_product_data };

//商品資料
async function get_product_data() {
    const data_url = './data/product_data.json';

    try {
        const response = await fetch(data_url);

        // 檢查響應狀態是否為 200（成功）
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        return data

    } catch (error) {
        console.error('Error fetching product information:', error);
    }
}