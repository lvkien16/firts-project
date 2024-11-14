import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import AdminHeader from "./components/AdminHeader";
import AdminHome from "./pages/admin/AdminHome";
import ProductManagement from "./pages/admin/ProductManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        {currentUser && currentUser.isAdmin ? <AdminHeader /> : <Header />}
        <Routes>
          {currentUser && currentUser.isAdmin ? (
            <>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/product-management" element={<ProductManagement />} />
            <Route path="/admin/category-management" element={<CategoryManagement />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
