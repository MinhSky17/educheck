import { useState } from "react";

function Header(){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    }

    return(
        <header className="fixed w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="relative flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-check-icon lucide-book-check"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/></svg>
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-gray-900">EduCheck</span>
                    </div>
                    {/* menu */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="#features" className="text-gray-600 horver:text-primary font-medium transition">Tính năng</a>
                        <a href="#how-it-works" className="text-gray-600 horver:text-primary font-medium transition">Cách hoạt động</a>
                        <a href="#teachers" className="text-gray-600 horver:text-primary font-medium transition">Dành cho giáo viên</a>
                        <a href="#students" className="text-gray-600 horver:text-primary font-medium transition">Dành cho học sinh</a>
                    </nav>
                    {/* auth buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-gray-600 font-medium hover:text-primary transition">Đăng nhập</a>
                        <a href="#" className="bg-primary hover:bg-primaryHover text-white px-5 py-2.5 rounded-full font-medium transition shadow-md shadow-primary/20">Đăng ký miễn phí</a>
                    </div>
                    {/* Menu mobile button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Navigation */}
            <div className={`md:hidden bg-white border-b border-gray-100 absolute w-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'block' : 'hidden'
                }`}>
                <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
                    <a href="#features" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-md">Tính năng</a>
                    <a href="#how-it-works" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-md">Cách hoạt động</a>
                    <a href="#teachers" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-md">Giáo viên</a>
                    <a href="#students" onClick={closeMobileMenu}  className="block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-md">Học sinh</a>
                    <div className="border-t border-gray-100 my-2 pt-2 flex flex-col gap-2">
                        <a href="#" onClick={closeMobileMenu} className="block w-full text-center px-3 py-2 text-gray-600 font-medium border border-primary rounded-lg">Đăng nhập</a>
                        <a href="#" onClick={closeMobileMenu} className="block w-full text-center px-3 py-2 text-white bg-primary font-medium rounded-lg">Đăng ký miễn phí</a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;