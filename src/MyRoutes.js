import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";
import { UserAuthContextProvider } from "./contexts/UserAuthContext";
import AddPage from "./pages/AddPage";
import AdminPage from "./pages/AdminPanel";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import FormSale from "./pages/FormSale";

const MyRoutes = () => {
  return (
    <UserAuthContextProvider>
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
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/form-sale" element={<FormSale />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </ClientProvider>
    </UserAuthContextProvider>
  );
};

export default MyRoutes;
