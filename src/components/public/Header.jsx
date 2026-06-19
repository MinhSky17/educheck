function Header(){
    return(
        <header className="fixed w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="relative flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-check-icon lucide-book-check"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/></svg>
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-gray-900">EduCheck</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;