function Feature() {
    const features = [
        {
            title: "Giao bài tập",
            description:
                "Giáo viên tạo và giao bài tập nhanh chóng cho từng lớp, đính kèm tài liệu học tập đa dạng.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-primary transition-colors group-hover:text-white" aria-hidden="true">
                    <path d="M12 7v14" />
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                </svg>
            ),
            accent: "bg-blue-50 text-blue-600 group-hover:bg-primary",
        },
        {
            title: "Tạo bài kiểm tra",
            description:
                "Tạo đề trắc nghiệm hoặc tự luận trực tuyến dễ dàng, cài đặt thời gian làm bài tự động.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-purple-600 transition-colors group-hover:text-white" aria-hidden="true">
                    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                    <path d="M12 17h.01" />
                    <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
                </svg>
            ),
            accent: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
        },
        {
            title: "Nộp bài đa phương tiện",
            description:
                "Học sinh dễ dàng tải lên file bài làm dưới nhiều định dạng: Hình ảnh, PDF, Word hay gõ trực tiếp.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-green-600 transition-colors group-hover:text-white" aria-hidden="true">
                    <path d="M12 13v8" />
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="m8 17 4-4 4 4" />
                </svg>
            ),
            accent: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500",
        },
        {
            title: "Chấm điểm & Nhận xét",
            description:
                "Giáo viên phản hồi chi tiết từng bài làm, có thể highlight, vẽ trực tiếp lên ảnh nộp của học sinh.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-orange-600 transition-colors group-hover:text-white" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            ),
            accent: "bg-orange-50 text-orange-600 group-hover:bg-orange-600",
        },
        {
            title: "Theo dõi tiến độ",
            description:
                "Hệ thống tổng hợp điểm số tự động thành bảng điểm, giúp học sinh theo dõi sát sao.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-teal-600 transition-colors group-hover:text-white" aria-hidden="true">
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                    <path d="M18 17V9" />
                    <path d="M13 17V5" />
                    <path d="M8 17v-3" />
                </svg>
            ),
            accent: "bg-teal-50 text-teal-600 group-hover:bg-teal-600",
        },
        {
            title: "Thông báo tức thời",
            description:
                "Gửi thông báo nhắc nhở lịch nộp bài sắp đến hạn và báo ngay khi có kết quả điểm mới.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-rose-600 transition-colors group-hover:text-white" aria-hidden="true">
                    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                    <path d="M22 8c0-2.3-.8-4.3-2-6" />
                    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                    <path d="M4 2C2.8 3.7 2 5.7 2 8" />
                </svg>
            ),
            accent: "bg-rose-50 text-rose-600 group-hover:bg-rose-500",
        },
    ];

    return (
        <section id="features" className="relative overflow-hidden py-16 bg-slate-50">
            <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-24 h-56 w-56 rounded-full bg-cyan-100/80 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mx-auto mb-14 max-w-3xl">
                    {/* <span className="rounded-full bg-primary/10 px-4 py-1 text-md font-bold uppercase tracking-[0.1em] text-primary">
                        Tính năng nổi bật
                    </span> */}
                    <h3 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                        Mọi thứ cần thiết cho việc dạy và học
                    </h3>
                    <p className="mt-3 text-lg leading-7 text-slate-600">
                        Hệ thống được thiết kế tối giản nhưng đầy đủ công cụ để quản lý toàn bộ vòng đời của một bài tập.
                    </p>
                </div>

                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_64px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(15,23,42,0.10)]"
                        >
                            <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${feature.accent} group-hover:scale-110 transition duration-300`}>
                                {feature.icon}
                            </div>
                            <h4 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
                                {feature.title}
                            </h4>
                            <p className="text-slate-600 leading-6">{feature.description}</p>
                            
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Feature;
