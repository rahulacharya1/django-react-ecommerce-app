import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Fixed Header */}
            <AdminHeader />

            <div className="flex">
                {/* Sidebar - Remains sticky via its internal classes */}
                <AdminSidebar />

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 overflow-y-auto px-8 py-10 lg:px-12">
                    <div className="mx-auto max-w-6xl">
                        {/* The Outlet renders the specific admin page (Dashboard, Products, etc.) */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
