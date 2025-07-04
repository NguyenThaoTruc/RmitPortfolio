// ================= NAVBAR FUNCTION ================= //

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navbar = document.querySelector('.navbar'); // Lấy navbar element

// Toggle menu cho mobile
if (menu && menuLinks) {
    menu.addEventListener('click', function () {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
        // Khi mở/đóng menu mobile, có thể cần đảm bảo navbar hiển thị đầy đủ
        // Hoặc tắt animation ẩn/hiện tạm thời để tránh xung đột
        if (navbar) {
            if (menuLinks.classList.contains('active')) {
                gsap.to(navbar, { y: 0, duration: 0.3, ease: "power2.out" });
                navbar.classList.add('mobile-menu-active'); // Thêm class để CSS có thể giữ toggle
            } else {
                navbar.classList.remove('mobile-menu-active');
            }
        }
    });
}


let lastScrollTop = 0;
// Không cần khai báo lại const navbar ở đây

if (navbar) {
    // Tạo một animation GSAP cho navbar
    let navHideAnimation = gsap.to(navbar, {
        yPercent: -100, // Ẩn hoàn toàn lên trên
        paused: true,   // Tạm dừng ban đầu
        duration: 0.3,  // Thời gian animation
        ease: "power2.inOut" // Kiểu chuyển động
    });

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Nếu menu mobile đang mở, KHÔNG ẩn navbar
        if (menuLinks && menuLinks.classList.contains('active')) {
            navHideAnimation.reverse(); // Đảm bảo navbar hiển thị
            lastScrollTop = currentScroll; // Cập nhật để tránh nhảy khi đóng menu
            return; // Thoát khỏi hàm cuộn
        }

        if (currentScroll > lastScrollTop && currentScroll > 60) { // Cuộn xuống và đã qua phần top của navbar
            navHideAnimation.play(); // Chạy animation ẩn
        } else { // Cuộn lên hoặc ở top trang
            navHideAnimation.reverse(); // Chạy animation hiện
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}


// Popup gallery
// Get the popup container, close button, and popup image
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const closeBtn = document.querySelector('.close');

// Current image index
let currentImageIndex = 0;
const images = [];

// Show the popup with the clicked image
document.querySelectorAll('.image-box img').forEach((item, index) => {
    item.addEventListener('click', () => {
        popup.style.display = 'flex';
        popupImage.src = item.getAttribute('src').replace('-thumb', '');
        currentImageIndex = index;
        images.length = 0; // Reset images array
        document.querySelectorAll('.image-box img').forEach(img => images.push(img.getAttribute('src').replace('-thumb', '')));
        
        // Set initial opacity for smooth fade-in
        gsap.set(popup, { opacity: 0 });
        gsap.to(popup, { opacity: 1, duration: 0.4, ease: "power2.out" });
    });
});

// Close the popup
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Change image function
function changeImage(step) {
    currentImageIndex = (currentImageIndex + step + images.length) % images.length;
    popupImage.src = images[currentImageIndex];
}

//HIGHLIGHT FUNCTIONALITY
// ================= HIGHLIGHT FUNCTIONALITY ================= //
