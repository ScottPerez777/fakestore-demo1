import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import EditProduct from "./components/EditProduct";
import Cart from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
