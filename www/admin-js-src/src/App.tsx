import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import axios from "axios";
import { useAdminContext } from "./hooks/useAdminContext";

axios.defaults.baseURL = "http://backend2.ub2023.hu/api/v1/";

const App = () => {
  const { token } = useAdminContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token === null ? <Navigate to="/login" /> : <Index />} />
        <Route path="/login" element={token === null ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
