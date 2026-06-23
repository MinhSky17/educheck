function FAQ(){
    return(
            <section class="py-20 bg-gray-50">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h3 class="text-3xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h3>
            </div>

            <div class="space-y-4">
                {/* FAQ Item 1  */}
                <div class="bg-white border border-gray-200 rounded-lg p-5">
                    <h4 class="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-question-mark-icon lucide-circle-question-mark w-5 h-5 text-primary"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                        EduCheck có miễn phí không?
                    </h4>
                    <p class="text-gray-600 pl-7">Có, nền tảng cung cấp gói cơ bản hoàn toàn miễn phí cho cả giáo viên và học sinh với đầy đủ các tính năng cốt lõi để duy trì lớp học.</p>
                </div>
                {/* FAQ Item 2 */}
                <div class="bg-white border border-gray-200 rounded-lg p-5">
                    <h4 class="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle w-5 h-5 text-primary"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                        Học sinh có cần tải ứng dụng về máy không?
                    </h4>
                    <p class="text-gray-600 pl-7">Không cần thiết. EduCheck là nền tảng Web-based, học sinh chỉ cần truy cập website bằng trình duyệt trên điện thoại hoặc máy tính là có thể sử dụng.</p>
                </div>
                {/* FAQ Item 3 */}
                <div class="bg-white border border-gray-200 rounded-lg p-5">
                    <h4 class="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle w-5 h-5 text-primary"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                        Hệ thống hỗ trợ nộp file định dạng nào?
                    </h4>
                    <p class="text-gray-600 pl-7">Chúng tôi hỗ trợ đa dạng: Hình ảnh (JPG, PNG), Tài liệu (PDF, Word, Excel), File nén (ZIP, RAR) và cả nộp bài bằng cách gõ văn bản trực tiếp.</p>
                </div>
            </div>
        </div>
    </section>
    );

}

export default FAQ;