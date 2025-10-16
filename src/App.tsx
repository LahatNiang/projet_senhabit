import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderEnhanced from "./components/layout/HeaderEnhanced";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLayout from "./pages/AdminLayout";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import  ListClients from "./pages/ListClients";

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen bg-white">
        <HeaderEnhanced />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
             <Route path="/admin/*" element={<AdminLayout />} />
             <Route path="/login" element={<Login />} />
             <Route path="/listclients" element={<ListClients />} />
             <Route
            path="/admin/*"
            element={
            <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
