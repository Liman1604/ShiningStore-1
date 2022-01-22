import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";
import AddPage from "./pages/AddPage";
import AdminPage from "./pages/AdminPanel";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";

const MyRoutes = () => {
  return (
    <ClientProvider>
      <AdminProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin-panel" element={<AdminPage />} />
            <Route path="/admin-panel/add" element={<AddPage />} />
            <Route path="/admin-panel/edit/:id" element={<EditPage />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </ClientProvider>
  );
};

export default MyRoutes;
