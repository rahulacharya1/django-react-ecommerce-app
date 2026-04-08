import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddCategory />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
