
export { get_product_information };

async function get_product_information() {
    const data_url = './data/product_data.json';

    try {
        const response = await fetch(data_url);

        // 檢查響應狀態是否為 200（成功）
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();  //解析JSON 
        return data

    } catch (error) {
        console.error('Error fetching product information:', error);
    }
}