import { useSelector } from "react-redux";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Home from "./Pages/Home-page/Home";
import Join from "./Pages/Join-page/Join";
import Register from "./Pages/Register-page/Register";

function App() {
  
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/join" replace />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/join" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
