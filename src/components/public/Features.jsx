function Feature() {
    return (
        <section id="features" className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-primary font-semibold tracking-wide uppercase text-lg mb-2">
                        Tính năng
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Mọi thứ cần thiết cho việc dạy và học
                    </h3>
                    <p className="text-gray-600 text-lg">
                        Hệ thống được thiết kế tối giản nhưng đầy đủ công cụ để quản lý toàn bộ vòng đời của một bài tập.
                    </p>
                </div>
                <div className="grid md:grid-clos-2 lg:grid-cols-3 gap-8">
                {/* Tinh nang 1 */}
                <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                    <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open" className="w-7 h-7 text-primary group-hover:text-white transition-colors" ><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
                    </div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">Giao bài tập</h4>
                    <p class="text-gray-600">Giáo viên tạo và giao bài tập nhanh chóng cho từng lớp, đính kèm tài liệu học tập đa dạng.</p>
                </div>
                {/* Tinh nang 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-ms border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-question-mark-icon lucide-file-question-mark w-7 h-7 text-purple-600 group-hover:text-white transition-colors"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M12 17h.01"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/></svg>
                    </div>          
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Tạo bài kiểm tra</h4>
                    <p className="text-gray-600">
                        Tạo đề trắc nghiệm hoặc tự luận trực tuyến dễ dàng, cài đặt thời gian làm bài tự động.
                    </p>
                </div>
                {/* Tinh nang 3 */}
                <div className="bg-white p-8 rounded-2xl shadow-ms border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-500 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-upload-icon lucide-cloud-upload w-7 h-7 text-green-600 group-hover:text-white transition-colors"><path d="M12 13v8"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/></svg>
                    </div>          
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Nộp bài đa phương tiện</h4>
                    <p className="text-gray-600">
                        Học sinh dễ dàng tải lên file bài làm dưới nhiều định dạng: Hình ảnh, PDF, Word hay gõ trực tiếp.
                    </p>
                </div>
                {/* Tinh nang 4 */}
                <div className="bg-white p-8 rounded-2xl shadow-ms border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-600 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check w-7 h-7 text-orange-600 group-hover:text-white transition-colors"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>          
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Chấm điểm & Nhận xét</h4>
                    <p className="text-gray-600">
                        Giáo viên phản hồi chi tiết từng bài làm, có thể highlight, vẽ trực tiếp lên ảnh nộp của học sinh.
                    </p>
                </div>
                {/* Tinh nang 5 */}
                <div className="bg-white p-8 rounded-2xl shadow-ms border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-600 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-column-icon lucide-chart-column w-7 h-7 text-teal-600 group-hover:text-white transition-colors"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                    </div>          
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Theo dõi tiến độ</h4>
                    <p className="text-gray-600">
                        Hệ thống tổng hợp điểm số tự động thành bảng điểm, giúp học sinh theo dõi sát sao.
                    </p>
                </div>
                {/* Tinh nang 6 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-500 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-ring-icon lucide-bell-ring w-7 h-7 text-rose-600 group-hover:text-white transition-colors"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M22 8c0-2.3-.8-4.3-2-6"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/></svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Thông báo tức thời</h4>
                    <p className="text-gray-600">
                        Gửi thông báo nhắc nhở lịch nộp bài sắp đến hạn và báo ngay khi có kết quả điểm mới.
                    </p>
                </div>
        
            </div>
            </div>
            
        </section>
    );
}

export default Feature;
