function CTA() {
    return(
        <section class="py-20 relative overflow-hidden">
        <div class="absolute inset-0 bg-blue-50"></div>
        {/* Abstract Shapes*/}
        <div class="absolute z-10 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
            <div class="absolute bottom-0 right-0 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Bắt đầu hành trình học tập số cùng EduCheck</h2>
            <p class="text-xl text-gray-600 mb-10">Tạo lớp học đầu tiên của bạn chỉ trong vài phút. Không yêu cầu thẻ tín dụng.</p>
            <a href="#" class="inline-block bg-primary hover:bg-primaryHover text-white px-10 py-4 rounded-full font-bold text-lg transition shadow-xl shadow-primary/30 transform hover:scale-105">
                Đăng ký tài khoản ngay
            </a>
        </div>
    </section>
    );
}

export default CTA;