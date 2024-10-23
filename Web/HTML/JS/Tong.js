
 let slideIndex = 0;
 let slides = document.getElementsByClassName("slides");
 let dots = document.getElementsByClassName("dot");

 // Tự động chuyển hình mỗi 5 giây
 function showSlides() {
     for (let i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";  
     }

     slideIndex++;
     if (slideIndex > slides.length) {
         slideIndex = 1;
     }

     for (let i = 0; i < dots.length; i++) {
         dots[i].className = dots[i].className.replace(" active", "");
     }

     slides[slideIndex - 1].style.display = "block";  
     dots[slideIndex - 1].className += " active";
     
     setTimeout(showSlides, 5000);
 }

 showSlides();

 // Điều hướng slideshow bằng nút
 document.querySelector('.prev').addEventListener('click', function() {
     slideIndex -= 2; 
     showSlides();
 });

 document.querySelector('.next').addEventListener('click', function() {
     showSlides();
 });

 // Sự kiện cho các nút chấm tròn
 Array.from(dots).forEach((dot, index) => {
     dot.addEventListener('click', () => {
         slideIndex = index;
         showSlides();
     });
 });

 // Xử lý giỏ hàng
 let cart = JSON.parse(localStorage.getItem('cart')) || [];

 function addToCart(product) {
     cart.push(product);
     localStorage.setItem('cart', JSON.stringify(cart));
     alert('Đã thêm sản phẩm vào giỏ hàng!');
     updateCartTotal(); // Cập nhật tổng số tiền khi thêm sản phẩm
 }

 function updateCartTotal() {
     let total = 0;
     cart.forEach(item => {
         // Xử lý giá sản phẩm
         let price = parseFloat(item.price.replace(/[^\d.-]/g, '').trim()) || 0; // Chuyển đổi giá thành số
         total += price; // Cộng dồn giá vào tổng
     });

     // Hiển thị tổng tiền
     const totalPriceElement = document.getElementById('total-price');
     if (totalPriceElement) {
         totalPriceElement.textContent = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }); // Định dạng tiền tệ
     }
 }

 // Bắt sự kiện thêm vào giỏ hàng
 document.querySelectorAll('.add-to-cart-button').forEach(button => {
     button.addEventListener('click', function (event) {
         event.preventDefault();
         const product = {
             id: this.getAttribute('data-id'),
             name: this.closest('.product').querySelector('h3').textContent,
             price: this.closest('.product').querySelector('p').textContent.replace('Giá:', '').trim(),
         };
         addToCart(product);
     });
 });

 updateCartTotal(); // Cập nhật tổng số tiền khi trang được tải
 document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        
        const product = this.closest('.product');
        const productName = product.querySelector('h3').innerText;
        const productDescription = product.querySelector('p').innerText;
        const productPrice = product.querySelectorAll('p')[1].innerText;

        const productDetails = `
            <h3>${productName}</h3>
            <p>${productDescription}</p>
            <p>${productPrice}</p>
        `;

        document.getElementById('details-content').innerHTML = productDetails;
        document.getElementById('details-panel').style.display = 'block';
    });
});

function closeDetails() {
    document.getElementById('details-panel').style.display = 'none';
}
function showDetails(element) {
    var name = element.getAttribute("data-name");
    var specs = element.getAttribute("data-cpu") ? 
        `CPU: ${element.getAttribute("data-cpu")}, GPU: ${element.getAttribute("data-gpu")}, RAM: ${element.getAttribute("data-ram")}, SSD: ${element.getAttribute("data-ssd")}, Màn hình: ${element.getAttribute("data-screen") || ''}` : 
        element.getAttribute("data-specs");
    var price = element.getAttribute("data-price");
    var availability = element.getAttribute("data-availability");
    var image = element.getAttribute("data-image");

    document.getElementById("details-image").src = image;
    document.getElementById("details-name").textContent = name;
    document.getElementById("details-specs").textContent = specs;
    document.getElementById("details-price").textContent = "Giá: " + price;
    document.getElementById("details-availability").textContent = "Tình trạng: " + availability;

    document.getElementById("details").style.display = "block"; // Hiển thị bảng chi tiết
}

function hideDetails() {
    document.getElementById("details").style.display = "none"; // Ẩn bảng chi tiết
}