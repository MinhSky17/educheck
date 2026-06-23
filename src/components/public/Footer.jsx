function Footer() {
    return(
        <footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* <!-- Brand Info --> */}
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-check-icon lucide-book-check w-8 h-8 text-white"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/></svg>
                        <span class="font-bold text-2xl text-white tracking-tight">EduCheck</span>
                    </div>
                    <p class="text-gray-400 max-w-sm">Học tập thông minh - Đánh giá dễ dàng. Giải pháp chuyển đổi số toàn diện cho lớp học của bạn.</p>
                </div>

                {/* <!-- Links 1 --> */}
                <div>
                    <h4 class="text-white font-bold mb-4 uppercase text-sm tracking-wider">Sản phẩm</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-white transition">Tính năng</a></li>
                        <li><a href="#" class="hover:text-white transition">Bảng giá</a></li>
                        <li><a href="#" class="hover:text-white transition">Hướng dẫn sử dụng</a></li>
                        <li><a href="#" class="hover:text-white transition">Trung tâm hỗ trợ</a></li>
                    </ul>
                </div>

                {/* <!-- Links 2 --> */}
                <div>
                    <h4 class="text-white font-bold mb-4 uppercase text-sm tracking-wider">Liên hệ</h4>
                    <ul class="space-y-2">
                        <li class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail w-4 h-4"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                            hello@educheck.vn</li>
                        <li class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone w-4 h-4"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
                            1900 xxxx</li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-sm text-gray-500">© 2026 EduCheck. All rights reserved.</p>
                <div class="flex gap-4 text-sm text-gray-500">
                    <a href="#" class="hover:text-white">Điều khoản sử dụng</a>
                    <a href="#" class="hover:text-white">Chính sách bảo mật</a>
                </div>
            </div>
        </div>
    </footer>
    );
}

export default Footer;