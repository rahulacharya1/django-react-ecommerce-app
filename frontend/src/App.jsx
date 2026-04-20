import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ManageCategories from "./pages/ManageCategories";
import ManageProducts from "./pages/ManageProducts";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminLayout from "./layouts/AdminLayout";
import ProductView from "./pages/ProductView";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";

function LegacyEditCategoryRedirect() {
    const { id } = useParams();
    return <Navigate to={`/admin/categories/${id}/edit`} replace />;
}

function LegacyEditProductRedirect() {
    const { id } = useParams();
    return <Navigate to={`/admin/products/${id}/edit`} replace />;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductView />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="categories" element={<ManageCategories />} />
                        <Route path="categories/add" element={<AddCategory />} />
                        <Route path="categories/:id/edit" element={<EditCategory />} />
                        <Route path="products" element={<ManageProducts />} />
                        <Route path="products/add" element={<AddProduct />} />
                        <Route path="products/:id/edit" element={<EditProduct />} />
                    </Route>
                </Route>
                <Route path="/manage-categories" element={<Navigate to="/admin/categories" replace />} />
                <Route path="/add-category" element={<Navigate to="/admin/categories/add" replace />} />
                <Route path="/edit-category/:id" element={<LegacyEditCategoryRedirect />} />
                <Route path="/manage-products" element={<Navigate to="/admin/products" replace />} />
                <Route path="/add-product" element={<Navigate to="/admin/products/add" replace />} />
                <Route path="/edit-product/:id" element={<LegacyEditProductRedirect />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
