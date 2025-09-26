import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import Home from "./pages/Home";
import CreateClient from "./pages/CreateClients";
import Clients from "./pages/Clients";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/new_client"
        element={
          <ProtectedRoute>
            <CreateClient />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={"/home"} replace />} />
    </Routes>
  );
}


export default App