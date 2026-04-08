function Footer() {
    return (
        <footer className="mt-20 border-t border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center">
                            <span className="text-[10px] font-bold text-slate-600">RA</span>
                        </div>
                        <p className="text-sm text-slate-500 font-medium">
                            © {new Date().getFullYear()} Rahul App. All rights reserved.
                        </p>
                    </div>

                    <div className="flex gap-8">
                        <a href="#" className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                            Twitter
                        </a>
                        <a href="#" className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                            GitHub
                        </a>
                        <a href="#" className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                    <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">
                        Built with focus and precision
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
