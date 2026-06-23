function Workflow(){
    return(
    <section id="how-it-works" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Quy trình vận hành đơn giản</h3>
                <p class="text-gray-600 text-lg">Chỉ với 4 bước để số hóa lớp học của bạn</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {/* <!-- Connecting Line (Desktop only) --> */}
                <div class="hidden md:block absolute top-7/10 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>

                {/* Step 1 */}
                <div class="relative z-10 text-center">
                    <div class="w-16 h-16 mx-auto bg-white border-4 border-primary rounded-full flex items-center justify-center text-xl font-bold text-primary mb-4 shadow-lg">1</div>
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h4 class="font-bold text-gray-900 mb-2">Tạo lớp học</h4>
                        <p class="text-sm text-gray-600">Giáo viên khởi tạo lớp và mời học sinh qua mã Code.</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div class="relative z-10 text-center">
                    <div class="w-16 h-16 mx-auto bg-white border-4 border-blue-400 rounded-full flex items-center justify-center text-xl font-bold text-blue-400 mb-4 shadow-lg">2</div>
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h4 class="font-bold text-gray-900 mb-2">Giao bài tập</h4>
                        <p class="text-sm text-gray-600">Thiết lập yêu cầu, định dạng file nộp và deadline.</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div class="relative z-10 text-center">
                    <div class="w-16 h-16 mx-auto bg-white border-4 border-orange-400 rounded-full flex items-center justify-center text-xl font-bold text-orange-400 mb-4 shadow-lg">3</div>
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h4 class="font-bold text-gray-900 mb-2">Học sinh nộp bài</h4>
                        <p class="text-sm text-gray-600">Học sinh làm bài và upload ảnh/file lên hệ thống.</p>
                    </div>
                </div>

                {/* Step 4 */}
                <div class="relative z-10 text-center">
                    <div class="w-16 h-16 mx-auto bg-white border-4 border-secondary rounded-full flex items-center justify-center text-xl font-bold text-secondary mb-4 shadow-lg">4</div>
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h4 class="font-bold text-gray-900 mb-2">Chấm & Phản hồi</h4>
                        <p class="text-sm text-gray-600">Giáo viên cho điểm, nhận xét. Học sinh nhận kết quả ngay.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}

export default Workflow;