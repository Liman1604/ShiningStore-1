import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";
import AuthProvider from "./contexts/AuthProvider";
import AddPage from "./pages/AddPage";
import AdminPage from "./pages/AdminPanel";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";

const MyRoutes = () => {
  return (
    <AuthProvider>
      <ClientProvider>
        <AdminProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin-panel" element={<AdminPage />} />
              <Route path="/admin-panel/add" element={<AddPage />} />
              <Route path="/admin-panel/edit/:id" element={<EditPage />} />
              <Route path="/product-detail/:id" element={<DetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/authorization" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </ClientProvider>
    </AuthProvider>
  );
};

export default MyRoutes;
