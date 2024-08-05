import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext"; // Importe o ToastProvider
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import CadastroUsuario from "./pages/Cadastros/cadastroUsuario"; // Importe o componente CadastroUsuario
import ManageUsers from "./pages/Manager/ManageUsers";
import UserDetails from "./pages/Manager/UserDetails";
import ProtectedRoute from "./components/ProtectedRoute"; // Importe o ProtectedRoute

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/cadastrar-usuario" element={<CadastroUsuario />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/user-details/:userRa" element={<UserDetails />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
