export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand Section */}
                    <div className="text-center md:text-left">
                        <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                            My<span className="text-indigo-600">Store</span>
                        </h2>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            Building a seamless shopping experience with modern tech.
                            Clean, simple, and designed for you.
                        </p>
                    </div>

                    {/* Bottom Bar / Copyright */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="text-xs text-gray-400">
                            © {currentYear} MyStore. All rights reserved.
                        </p>
                        <nav className="flex gap-4">
                            <a href="#" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Privacy</a>
                            <a href="#" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Terms</a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}
