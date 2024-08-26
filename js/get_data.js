export { fetch_data };

//解析
function parse_data_array(data) {
    return data.json()
}

//拿取資料
async function fetch_data(url) {
    try {
        const response = await fetch(url);

        // 檢查響應狀態是否為 200（成功）
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await parse_data_array(response);//返回解析後數組

    } catch (error) {
        console.error('Error fetching  information:', error);
    }
}