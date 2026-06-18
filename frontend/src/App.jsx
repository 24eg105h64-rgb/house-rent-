import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProperty from "./pages/AddProperty";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-property" element={<AddProperty />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
