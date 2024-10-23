// Tạo một đối tượng giỏ hàng
const cart = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    
    // Thêm sản phẩm vào giỏ hàng
    addItem(name, specs, price, image) {
        if (isNaN(price) || price <= 0) {
            console.error("Giá không hợp lệ:", price);
            return; // Không thêm sản phẩm nếu giá không hợp lệ
        }

        const existingItem = this.items.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1; // Tăng số lượng nếu sản phẩm đã tồn tại
        } else {
            const newItem = {
                name,
                specs,
                price: Number(price), // Chắc chắn rằng giá là số
                quantity: 1,
                image
            };
            this.items.push(newItem); // Thêm sản phẩm mới vào giỏ hàng
        }

        this.saveCart(); // Lưu giỏ hàng vào localStorage
        this.updateCart(); // Cập nhật giỏ hàng
    },

    // Lưu giỏ hàng vào localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },

    // Cập nhật giỏ hàng hiển thị trên trang
    updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = ''; // Xóa nội dung cũ
        let totalPrice = 0; // Khởi tạo tổng giá

        this.items.forEach((item, index) => {
            const row = document.createElement('tr');
            const itemTotal = item.price * item.quantity; // Tính tổng cho từng sản phẩm

            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
                <td>${item.name}</td>
                <td>${item.specs}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>${itemTotal.toLocaleString()} VND</td>
                <td><button onclick="removeFromCart(${index})">Xóa</button></td>
            `;
            cartItemsContainer.appendChild(row);
            totalPrice += itemTotal; // Cộng dồn giá tiền
        });

        // Cập nhật tổng tiền
        document.getElementById('total-price').innerText = totalPrice.toLocaleString() + ' VND'; 
        // Hiển thị thông báo giỏ hàng trống nếu không có sản phẩm
        document.getElementById('empty-cart-msg').style.display = this.items.length === 0 ? 'block' : 'none'; 
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeItem(index) {
        this.items.splice(index, 1); // Xóa sản phẩm theo chỉ số
        this.saveCart(); // Lưu lại giỏ hàng
        this.updateCart(); // Cập nhật giỏ hàng
    },

    // Cập nhật số lượng sản phẩm
    updateQuantity(index, quantity) {
        if (quantity < 1) {
            this.removeItem(index); // Xóa nếu số lượng < 1
        } else {
            this.items[index].quantity = Number(quantity); // Cập nhật số lượng
            this.saveCart(); // Lưu lại giỏ hàng
            this.updateCart(); // Cập nhật giỏ hàng
        }
    }
};

// Hàm thêm sản phẩm vào giỏ hàng từ nút nhấn
function addToCart(name, specs, price, image) {
    cart.addItem(name, specs, price, image);
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.removeItem(index);
}

// Hàm cập nhật số lượng sản phẩm
function updateQuantity(index, quantity) {
    cart.updateQuantity(index, quantity);
}

// Khởi động giỏ hàng khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    cart.updateCart(); // Cập nhật giỏ hàng
});
