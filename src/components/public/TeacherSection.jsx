function Teacher(){
    return(
        <section id="teachers" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="relative  order-2 md:order-1">
                        <div class="absolute w-full h-full bg-blue-100 rounded-3xl transform -rotate-3 scale-105"></div>
                        <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Giáo viên sử dụng laptop" class="relative z-1 rounded-3xl shadow-xl object-cover h-[400px] w-full"></img>
                    
                        <div class="absolute z-10 -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4">
                        <div class="w-12 h-12 bg-green-100 text-secondary rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check w-6 h-6"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 font-medium">Đã chấm xong</p>
                            <p class="font-bold text-gray-900">45/45 bài thi</p>
                        </div>
                    </div>
                    </div>

                    {/* Right Content */}
                    <div class="order-1 md:order-2">
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-primary font-semibold text-sm mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-presentation-icon lucide-presentation w-4 h-4"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg>
                         Dành cho Giáo viên
                    </div>
                    <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Giảng dạy hiệu quả hơn, tiết kiệm 50% thời gian</h3>
                    
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check w-6 h-6 text-primary flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            <span class="text-gray-700 text-lg">Tạo lớp học trực tuyến riêng biệt cho từng khối/môn.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check w-6 h-6 text-primary flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            <span class="text-gray-700 text-lg">Hệ thống tự động phân loại, khóa nộp bài khi quá hạn.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check w-6 h-6 text-primary flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            <span class="text-gray-700 text-lg">Công cụ chấm bài trực quan, lưu trữ toàn bộ lịch sử.</span>
                        </li>
                    </ul>

                    <a href="#" class="inline-flex items-center gap-2 text-primary font-bold text-lg hover:text-primaryHover transition">
                        Bắt đầu với vai trò Giáo viên
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right w-5 h-5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                </div>
                </div>
            </div>

        </section>
    );
}

export default Teacher;