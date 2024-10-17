
// Lấy giỏ hàng từ localStorage hoặc khởi tạo giỏ hàng mới nếu chưa có
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const emptyCartMsg = document.getElementById('empty-cart-msg');
const cartSection = document.getElementById('cart-section');

// Hàm hiển thị giỏ hàng
function renderCart() {
    // Làm trống danh sách hiện tại
    cartItemsContainer.innerHTML = '';
    let total = 0;

    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
        cartSection.style.display = 'none';
        emptyCartMsg.style.display = 'block';
        return;
    } else {
        cartSection.style.display = 'block';
        emptyCartMsg.style.display = 'none';
    }

    // Hiển thị sản phẩm trong giỏ hàng
    cart.forEach((item, index) => {
        const productTotal = parsePrice(item.price) * item.quantity;
        total += productTotal;

        // Tạo một dòng mới trong bảng cho từng sản phẩm
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input" style="width: 50px;">
            </td>
            <td>${productTotal.toLocaleString('vi-VN')} VND</td>
            <td><button class="btn remove-btn" data-index="${index}">Xóa</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Cập nhật tổng giá tiền
    totalPriceElement.textContent = `${total.toLocaleString('vi-VN')} VND`;
}

// Chuyển đổi giá từ chuỗi thành số
function parsePrice(priceString) {
    return Number(priceString.replace(/[^0-9.-]+/g, ""));
}

// Sự kiện thay đổi số lượng sản phẩm
cartItemsContainer.addEventListener('change', function(event) {
    if (event.target.classList.contains('quantity-input')) {
        const index = event.target.getAttribute('data-index');
        const newQuantity = parseInt(event.target.value);

        // Đảm bảo số lượng hợp lệ
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        } else {
            alert('Số lượng phải lớn hơn 0!');
            event.target.value = cart[index].quantity; // Khôi phục lại giá trị cũ nếu không hợp lệ
        }
    }
});

// Sự kiện xóa sản phẩm
cartItemsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
});

// Sự kiện thêm sản phẩm vào giỏ hàng
document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const product = {
            id: this.getAttribute('data-id'),
            name: this.parentElement.previousElementSibling.previousElementSibling.textContent,
            price: this.parentElement.previousElementSibling.textContent.replace('Giá:', '').trim(),
            image: this.querySelector('img').src  // Lấy hình ảnh sản phẩm
        };
        addToCart(product);
    });
});

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Chuyển hướng sang trang thanh toán khi người dùng nhấn nút "Tiếp tục thanh toán"
document.getElementById('checkout-btn').addEventListener('click', function() {
    window.location.href = 'checkout.html';
});

// Hiển thị giỏ hàng khi trang được tải
renderCart();