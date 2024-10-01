const products = [  
    { name: 'Laptop 1', price: 15000000, img: 'images/laptop1.jpg' },  
    { name: 'Laptop 2', price: 20000000, img: 'images/laptop2.jpg' },  
    { name: 'Laptop 3', price: 18000000, img: 'images/laptop3.jpg' },  
    { name: 'Laptop 4', price: 25000000, img: 'images/laptop4.jpg' }  
];  

let cart = [];  
let total = 0;  

function loadProducts() {  
    const productList = document.getElementById('productList');  
    products.forEach(product => {  
        const productDiv = document.createElement('div');  
        productDiv.className = 'product';  
        productDiv.innerHTML = `  
            <img src="${product.img}" alt="${product.name}">  
            <h3>${product.name}</h3>  
            <p>Giá: ${product.price.toLocaleString()} VNĐ</p>  
            <button onclick="addToCart('${product.name}', ${product.price})">Thêm vào giỏ hàng</button>  
        `;  
        productList.appendChild(productDiv);  
    });  
}  

function addToCart(productName, productPrice) {  
    cart.push({ name: productName, price: productPrice });  
    total += productPrice;  
    updateCart();  
}  

function updateCart() {  
    const cartItems = document.getElementById('cartItems');  
    cartItems.innerHTML = '';  
    
    cart.forEach(item => {  
        const li = document.createElement('li');  
        li.textContent = `${item.name} - ${item.price.toLocaleString()} VNĐ`;  
        cartItems.appendChild(li);  
    });  

    document.getElementById('totalPrice').textContent = 'Tổng: ' + total.toLocaleString() + ' VNĐ';  
}  

function checkout() {  
    if (cart.length === 0) {  
        alert('Giỏ hàng của bạn đang trống!');  
    } else {  
        alert(`Bạn đã thanh toán tổng cộng: ${total.toLocaleString()} VNĐ`);  
        cart = [];  
        total = 0;  
        updateCart();  
    }  
}  

// Load sản phẩm khi trang web được tải  
window.onload = loadProducts;