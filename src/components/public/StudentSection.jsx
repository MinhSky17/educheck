function StudentSection() {
    return(
        <section id="students" class="py-20 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                {/* Text side */}
                <div>
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-secondary font-semibold text-sm mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap-icon lucide-graduation-cap w-4 h-4"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                        Dành cho Học sinh
                    </div>
                    <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Học tập chủ động, không lo trễ hạn</h3>
                    
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check w-6 h-6 text-secondary flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            <span class="text-gray-700 text-lg">Xem toàn bộ bài tập cần làm trên một Dashboard duy nhất.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check w-6 h-6 text-secondary flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            <span class="text-gray-700 text-lg">Nộp ảnh chụp bài làm vở qua điện thoại cực nhanh.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check w-6 h-6 text-secondary flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            <span class="text-gray-700 text-lg">Xem lại lỗi sai từ nhận xét của Thầy Cô để rút kinh nghiệm.</span>
                        </li>
                    </ul>

                    <a href="#" class="inline-flex items-center gap-2 text-secondary font-bold text-lg hover:text-green-700 transition">
                        Khám phá góc học tập
                        <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </a>
                </div>

                {/* Image side */}
                <div class="relative">
                    <div class="absolute w-full h-full bg-green-100 rounded-3xl transform rotate-3 scale-105"></div>
                    <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Học sinh đang học" class=" relative z-1 rounded-3xl shadow-xl object-cover h-[400px] w-full"></img>
                    
                    {/* Floating card */}
                    <div class="absolute z-10 -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4">
                        <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell w-6 h-6"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
                        </div>
                        <div>
                            <p class="font-bold text-gray-900">Bài tập Toán 10</p>
                            <p class="text-sm text-orange-600 font-medium">Hạn nộp: 2 giờ nữa</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );

}

export default StudentSection;