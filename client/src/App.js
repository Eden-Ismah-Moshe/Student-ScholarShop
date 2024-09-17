import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Scholarships from "./pages/Scholarships";
import Ecommerce from "./pages/Ecommerce";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/scholarships" Component={Scholarships} />
        <Route path="/ecommerce" Component={Ecommerce} />
        <Route path="/about" Component={About} />
        {/* Dynamic route for product details */}
        <Route path="/products/:productId" Component={ProductDetails} />
      </Routes>
    </Router>
  );
}

export default App;
