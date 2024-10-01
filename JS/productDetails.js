function showDetails(productName, cpu, ram, vga, price) {
    const detailDiv = document.getElementById('product-detail');
    detailDiv.innerHTML = `
        <h2>${productName}</h2>
        <p>CPU: ${cpu}</p>
        <p>RAM: ${ram}</p>
        <p>VGA: ${vga}</p>
        <p>Giá: ${price} VND</p>
    `;
    detailDiv.style.display = 'block'; // Hiện thông tin chi tiết
}