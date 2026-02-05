import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProducts from "./pages/MyProducts";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-products" element={<MyProducts />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;