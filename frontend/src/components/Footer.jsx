export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                            My<span className="text-indigo-600">Store</span>
                        </h2>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            Building a seamless shopping experience with modern tech.
                            Clean, simple, and designed for you.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/products" className="hover:text-indigo-600 transition-colors">All Products</a></li>
                            <li><a href="/categories" className="hover:text-indigo-600 transition-colors">Categories</a></li>
                            <li><a href="/deals" className="hover:text-indigo-600 transition-colors">Featured Deals</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/faq" className="hover:text-indigo-600 transition-colors">FAQ</a></li>
                            <li><a href="/shipping" className="hover:text-indigo-600 transition-colors">Shipping Info</a></li>
                            <li><a href="/admin" className="hover:text-indigo-600 transition-colors">Admin Dashboard</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">
                        © {currentYear} MyStore. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-gray-600"><span className="sr-only">Twitter</span><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-gray-400 hover:text-gray-600"><span className="sr-only">GitHub</span><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
