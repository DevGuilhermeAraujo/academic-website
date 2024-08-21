import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext"; // Importe o ToastProvider
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import CadastroUsuario from "./pages/Manager/cadastroUsuario"; // Importe o componente CadastroUsuario
import ManageUsers from "./pages/Manager/ManageUsers";
import UserDetails from "./pages/Manager/UserDetails";
import ManageClass from "./pages/Manager/ManageClass";
import ClassDetails from "./pages/Manager/ClassDetails";
import AccessManagement from "./pages/Manager/AccessManagement.jsx"; // Importe o novo componente AccessManagement
import LinkGroups from "./pages/Manager/LinkGroups"; // Importe o componente LinkGroups
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
        <Route path="/manage-class" element={<ManageClass />} />
        <Route path="/class-details/:userRa" element={<ClassDetails />} />
        <Route path="/access-management" element={<AccessManagement />} /> {/* Adicione a nova rota */}
        <Route path="/link-groups/:screenId" element={<LinkGroups />} /> {/* Rota para LinkGroups */}
      </Routes>
    </ToastProvider>
  );
}

export default App;
