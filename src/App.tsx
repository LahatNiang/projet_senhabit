import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HeaderEnhanced from "./components/layout/HeaderEnhanced";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLayout from "./pages/AdminLayout";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import PrivateRoute from "./routes/PrivateRoute";
import ListClients from "./pages/ListClients";
import ListProprietes from "./pages/ListProprietes";
import FormulaireContrat from "./pages/FormulaireContrat";
import ForgotPassword from "./pages/ForgotPassword";
import Properties from './pages/Properties';
function AppContent() {
  const location = useLocation();

  // 🧩 Liste des routes où cacher header et footer
  const hiddenLayoutPaths = [
    "/admin",
    "/login",
    "/listclients",
    "/proprietes",
    "/contrats",
    "/register",
    "/logout",
    "/forgot-password"
    
  ];

  // Vérifie si la route actuelle commence par un des chemins ci-dessus
  const hideLayout = hiddenLayoutPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header visible uniquement si la page n’est pas dans la liste */}
      {!hideLayout && <HeaderEnhanced />}

      <main className={!hideLayout ? "pt-20" : ""}>
        <Routes>
          <Route path="/properties" element={<Properties />} />
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listclients" element={<ListClients />} />
          <Route path="/proprietes" element={<ListProprietes />} />
          <Route path="/contrats" element={<FormulaireContrat />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


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

      {/* Footer visible uniquement si la page n’est pas dans la liste */}
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
