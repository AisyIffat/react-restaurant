import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";

import Home from "./pages/Home";
import MenusPage from "./pages/MenusPage";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import CategoriesPage from "./pages/CategoriesPage";
import CartPage from "./pages/CartPage";
import InvoicePage from "./pages/InvoicePage";
import CheckoutPage from "./pages/CheckOutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menus" element={<MenusPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<ProductAdd />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
