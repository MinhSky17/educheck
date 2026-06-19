function Hero(){


    return(
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-primary font-semibold text-sm mb-6 border border-blue-100">
                            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                            Nền tảng Giáo dục 4.0
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Học tập thông minh
                            <br></br>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 ">chấm bài dễ dàng</span>
                            <br></br>
                            cùng EduCheck
                        </h1>
                        <p className="text-gray-600 max-w-lg mb-8 text-[18px] -mt-2 leading-relaxed">Nền tảng giúp giáo viên giao bài tập, tạo bài kiểm tra, chấm bài và nhận xét trực tuyến. Học sinh làm bài, nộp bài và theo dõi kết quả mọi lúc mọi nơi.</p>
                        <div className="bg-primary w-60 flex justify-center h-14 items-center rounded-full shadow-xl shadow-primary/20">
                            <a href="#" className="flex gap-2 text-white font-medium text-xl">
                                Bắt đầu miễn phí 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </a>
                        </div>
                    </div>
                    {/* Right */}
                    <div className="ralative mx-auto w-full max-w-md lg:max-w-full lg:mr-0 z-10">
                        <img src="https://res.cloudinary.com/dtrf9exnz/image/upload/q_auto/f_auto/v1781863590/Right__Mockup_Dashboard_p0h70i.png" alt="hero-right"></img>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Hero;